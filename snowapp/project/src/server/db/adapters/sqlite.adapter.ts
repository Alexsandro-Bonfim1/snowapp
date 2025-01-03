import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import type { DatabaseConfig, QueryResult } from '../types';

export class SQLiteAdapter {
  private db: sqlite3.Database | null = null;

  async connect(config: DatabaseConfig): Promise<void> {
    if (!config.filename) {
      throw new Error('Missing required SQLite configuration');
    }

    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(config.filename, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async query(sql: string): Promise<QueryResult> {
    if (!this.db) {
      throw new Error('Database not connected');
    }

    try {
      const all = promisify(this.db.all).bind(this.db);
      const rows = await all(sql);
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      
      return {
        columns,
        rows,
        rowCount: rows.length,
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
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db!.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  }
}