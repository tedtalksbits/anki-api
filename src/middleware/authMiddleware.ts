import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../jwt/jwtServices';
import { HTTPError } from '../exception';
export const verifySessionAndToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.session;
  if (!token) {
    const err = HTTPError.FORBIDDEN();
    return res.status(err.statusCode).json({ message: err.message });
  }

  try {
    verifyToken(token);
    next();
    return;
  } catch (error) {
    console.log(error);
    const err = HTTPError.UNAUTHORIZED();
    return res.status(err.statusCode).json({ message: err.message });
  }
};
