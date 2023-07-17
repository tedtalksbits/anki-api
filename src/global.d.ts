type SessionUser = {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN' | undefined;
};

type RequestSession = {
  token: string;
  user: SessionUser;
};

declare namespace Express {
  export interface Request {
    session: RequestSession;
  }
}
