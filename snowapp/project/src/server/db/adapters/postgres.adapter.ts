import { Pool } from 'pg';
import type { DatabaseConfig, QueryResult } from '../types';

export class PostgresAdapter {
  private pool: Pool | null = null;

  async connect(config: DatabaseConfig): Promise<void> {
    if (!config.host || !config.username || !config.database) {
      throw new Error('Missing required PostgreSQL configuration');
    }

    this.pool = new Pool({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      port: config.port || 5432,
    });
  }

  async query(sql: string): Promise<QueryResult> {
    if (!this.pool) {
      throw new Error('Database not connected');
    }

    try {
      const result = await this.pool.query(sql);
      return {
        columns: result.fields.map(f => f.name),
        rows: result.rows,
        rowCount: result.rowCount,
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
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}