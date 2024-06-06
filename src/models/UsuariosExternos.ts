import odbc from 'odbc';
import { getDatabaseConnection } from '../config/database';

interface UsuariosExternosAttributes {
  Id: number;
  Username: string;
  EMail?: string;
  PasswordHash?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

export default class UsuariosExternos {
  
  static async findAll(): Promise<UsuariosExternosAttributes[]> {
    const connection = getDatabaseConnection();
    const result = await connection.query('SELECT * FROM UsuariosExternos');
    return result.map((row: any) => ({
      Id: row.Id,
      Username: row.Username,
      EMail: row.EMail,
      PasswordHash: row.PasswordHash,
      CreatedAt: new Date(row.CreatedAt),
      UpdatedAt: new Date(row.UpdatedAt),
      DeletedAt: row.DeletedAt ? new Date(row.DeletedAt) : undefined,
    }));
  }
  /*
  static async findById(id: number): Promise<UsuariosExternosAttributes | null> {
    const connection = getDatabaseConnection();
    const result = await connection.query(`SELECT * FROM UsuariosExternos WHERE Id = ${id}`);
    if (result.length === 0) return null;
    const row = result[0];
    return {
      Id: row.Id,
      Username: row.Username,
      EMail: row.EMail,
      PasswordHash: row.PasswordHash,
      CreatedAt: new Date(row.CreatedAt),
      UpdatedAt: new Date(row.UpdatedAt),
      DeletedAt: row.DeletedAt ? new Date(row.DeletedAt) : null,
    };
  }
*/
  static async create(user: Omit<UsuariosExternosAttributes, 'Id' | 'CreatedAt' | 'UpdatedAt'>): Promise<void> {
    const connection = getDatabaseConnection();
    const sql = `
      INSERT INTO UsuariosExternos (Username, EMail, PasswordHash, CreatedAt, UpdatedAt)
      VALUES ('${user.Username}', '${user.EMail}', '${user.PasswordHash}', GETDATE(), GETDATE())
    `;
    await connection.query(sql);
  }

  static async update(id: number, user: Partial<Omit<UsuariosExternosAttributes, 'Id' | 'CreatedAt' | 'UpdatedAt'>>): Promise<void> {
    const connection = getDatabaseConnection();
    const updates = Object.entries(user).map(([key, value]) => `${key} = '${value}'`).join(', ');
    const sql = `UPDATE UsuariosExternos SET ${updates}, UpdatedAt = GETDATE() WHERE Id = ${id}`;
    await connection.query(sql);
  }

  static async delete(id: number): Promise<void> {
    const connection = getDatabaseConnection();
    const sql = `UPDATE UsuariosExternos SET DeletedAt = GETDATE() WHERE Id = ${id}`;
    await connection.query(sql);
  }
}
