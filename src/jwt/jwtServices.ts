import jwt from 'jsonwebtoken';
import { UserType } from '../user/userType';
export const generateToken = (user: UserType) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable not set');
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable not set');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};
