import db from './mysql';

export const EasyMySql = {
  async save(tableName: string, data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const [result] = await db.execute(
      `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys
        .map(() => '?')
        .join(', ')})`,
      values
    );
    return result;
  },

  async select(tableName: string, where: any) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const [result, rows] = await db.execute(
      `SELECT * FROM ${tableName} WHERE ${keys.join(' = ? AND ')} = ?`,
      values
    );
    return result;
  },

  async selectAll(tableName: string) {
    const [result] = await db.execute(`SELECT * FROM ${tableName}`);
    return result;
  },

  async update(tableName: string, data: any, where: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const [result] = await db.execute(
      `UPDATE ${tableName} SET ${keys
        .map((key) => `${key} = ?`)
        .join(', ')} WHERE ${whereKeys
        .map((key) => `${key} = ?`)
        .join(' AND ')}`,
      [...values, ...whereValues]
    );
    return result;
  },

  async delete(tableName: string, where: any) {
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const [result] = await db.execute(
      `DELETE FROM ${tableName} WHERE ${whereKeys
        .map((key) => `${key} = ?`)
        .join(' AND ')}`,
      whereValues
    );
    return result;
  },
};
