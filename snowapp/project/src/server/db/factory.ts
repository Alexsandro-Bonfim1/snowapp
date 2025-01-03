import { DatabaseType, DatabaseConfig } from './types';
import { MySQLAdapter } from './adapters/mysql.adapter';
import { PostgresAdapter } from './adapters/postgres.adapter';
import { SQLiteAdapter } from './adapters/sqlite.adapter';
import SnowflakeConnection from '../../services/snowflake/connection';

export class DatabaseFactory {
  static createAdapter(type: DatabaseType) {
    switch (type) {
      case 'mysql':
        return new MySQLAdapter();
      case 'postgres':
        return new PostgresAdapter();
      case 'sqlite':
        return new SQLiteAdapter();
      case 'snowflake':
        return SnowflakeConnection;
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}