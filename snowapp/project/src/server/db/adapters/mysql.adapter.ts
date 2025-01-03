import mysql from 'mysql2/promise';
import type { DatabaseConfig, QueryResult } from '../types';

export class MySQLAdapter {
  private connection: mysql.Connection | null = null;

  async connect(config: DatabaseConfig): Promise<void> {
    if (!config.host || !config.username || !config.database) {
      throw new Error('Missing required MySQL configuration');
    }

    this.connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      port: config.port || 3306,
    });
  }

  async query(sql: string): Promise<QueryResult> {
    if (!this.connection) {
      throw new Error('Database not connected');
    }

    try {
      const [rows, fields] = await this.connection.execute(sql);
      return {
        columns: fields.map(f => f.name),
        rows: rows as any[],
        rowCount: Array.isArray(rows) ? rows.length : 0,
        status: 'success'
      };
    } catch (error) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        status: 'error',
        message: error.message
      };
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}