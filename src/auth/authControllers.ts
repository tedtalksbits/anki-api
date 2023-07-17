import { Request, Response } from 'express';
import { UserRespository } from '../user/userRepository';
import CryptoJS from 'crypto-js';
import { UserDTOType } from '../user/userType';
import { generateToken } from '../jwt/jwtServices';
import { HTTPError } from '../exception/index';

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    const err = HTTPError.BAD_REQUEST('Email and password are required');
    return res.status(err.statusCode).json({ message: err.message });
  }
  const userRepo = new UserRespository();
  try {
    let foundUser = null;
    // check if user exists by email or username
    let findByEmailResponse = null;
    let findByUsernameResponse = null;
    // check if email exists
    findByEmailResponse = await userRepo.findByEmail(email);
    if (findByEmailResponse.length > 0) {
      foundUser = findByEmailResponse;
    } else {
      // check if username exists
      findByUsernameResponse = await userRepo.findByUsername(email);
      if (findByUsernameResponse.length > 0) {
        foundUser = findByUsernameResponse;
      }
    }
    if (!foundUser) {
      const err = HTTPError.UNAUTHORIZED('Invalid email or password');
      return res.status(err.statusCode).json({ message: err.message });
    }

    const user = foundUser[0];

    if (user.failed_login_attempts && user.failed_login_attempts >= 3) {
      const err = HTTPError.UNAUTHORIZED('Account locked');
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (!process.env.CRYPTO_SECRET || !process.env.JWT_SECRET) {
      const err = HTTPError.INTERNAL_ERROR(
        'Internal Server Error - code: RABBIT'
      );
      return res.status(err.statusCode).json({ message: err.message });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      const failedLoginAttempts = user.failed_login_attempts
        ? user.failed_login_attempts + 1
        : 1;
      await userRepo.update(user.id, {
        failed_login_attempts: failedLoginAttempts,
      });
      const err = HTTPError.UNAUTHORIZED('Invalid email or password');
      return res.status(err.statusCode).json({ message: err.message });
    }

    const token = generateToken(user);

    await userRepo.update(user.id, {
      failed_login_attempts: 0,
      last_login: new Date(),
    });

    req.session = {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    return res.json({ token });
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username, avatar, name, nickname, status } =
    req.body as UserDTOType;

  if (!email || !password || !username || !name) {
    const err = HTTPError.BAD_REQUEST(
      'email, name, password, username are required fields'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }

  const userRepo = new UserRespository();
  try {
    const foundUser = await userRepo.findByEmail(email);
    if (foundUser.length > 0) {
      const err = HTTPError.BAD_REQUEST('User already exists');
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (!process.env.CRYPTO_SECRET) {
      const err = HTTPError.INTERNAL_ERROR(
        'Internal Server Error - code: RABBIT'
      );
      return res.status(err.statusCode).json({ message: err.message });
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_SECRET
    ).toString();

    const user = await userRepo.save({
      email,
      password: encryptedPassword,
      username,
      avatar,
      name,
      nickname,
      status,
    });

    return res.json(user);
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: MONGOOSE'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};
