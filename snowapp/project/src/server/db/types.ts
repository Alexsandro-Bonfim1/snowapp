export type DatabaseType = 'mysql' | 'postgres' | 'sqlite' | 'snowflake';

export interface DatabaseConfig {
  type: DatabaseType;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  filename?: string; // For SQLite
  account?: string; // For Snowflake
  warehouse?: string; // For Snowflake
  schema?: string; // For Snowflake
}

export interface QueryResult {
  columns: string[];
  rows: any[];
  rowCount: number;
  status: 'success' | 'error';
  message?: string;
}