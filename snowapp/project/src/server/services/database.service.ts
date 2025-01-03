import databaseManager from '../../services/snowflake/database';
import { Database, Table } from '../../services/snowflake/database';

export class DatabaseService {
  async listDatabases(): Promise<string[]> {
    return databaseManager.listDatabases();
  }

  async getDatabase(name: string): Promise<Database | undefined> {
    return databaseManager.getDatabase(name);
  }

  async getTableSchema(
    database: string,
    schema: string,
    table: string
  ): Promise<Table | undefined> {
    return databaseManager.getTableSchema(database, schema, table);
  }
}