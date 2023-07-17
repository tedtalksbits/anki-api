import db from '../lib/mysql';
import { UserDTOType, UserType } from './userType';

export class UserRespository {
  tableName: string;

  constructor() {
    this.tableName = 'users';
  }
  async save(user: UserDTOType) {
    const [result] = await db.execute(
      `INSERT INTO ${this.tableName} (name, email, username, password, avatar, nickname, status, last_login, role) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.email,
        user.username,
        user.password,
        user.avatar || null,
        user.nickname || null,
        user.status || null,
        user.last_login || null,
        user.role || 'USER',
      ]
    );
    return result;
  }

  async findByEmail(email: string): Promise<UserType[]> {
    const [result] = await db.execute(
      `SELECT * FROM ${this.tableName} WHERE email = ?`,
      [email]
    );
    return result as UserType[];
  }

  async findByUsername(username: string): Promise<UserType[]> {
    const [result] = await db.execute(
      `SELECT * FROM ${this.tableName} WHERE username = ?`,
      [username]
    );
    return result as UserType[];
  }

  async update(id: number, update: Partial<UserType>) {
    // generate SET clause
    const setClause = Object.keys(update)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(update);
    const [result] = await db.execute(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result;
  }
}
