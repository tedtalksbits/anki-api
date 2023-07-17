import { Request, Response } from 'express';
import { HTTPError } from '../exception';
export const getCurrentUser = async (req: Request, res: Response) => {
  const { user } = req.session;

  if (!user) {
    return res.status(403).json(new HTTPError(403, 'Forbidden'));
  }

  return res.status(200).json({ user });
};
