export type UserType = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string | null;
  nickname: string | null;
  status: string | null;
  readonly created_at: Date;
  readonly updated_at: Date;
  last_login?: Date;
  failed_login_attempts?: number;
  preference_id?: number;
  role?: 'ADMIN' | 'USER';
};

export type UserDTOType = {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string | null;
  nickname: string | null;
  status: string | null;
  last_login?: Date;
  role?: 'ADMIN' | 'USER';
};
