export interface Database {
  name: string;
  schemas: Schema[];
}

export interface Schema {
  name: string;
  tables: Table[];
}

export interface Table {
  name: string;
  columns: Column[];
  rowCount: number;
}

export interface Column {
  name: string;
  type: string;
  nullable: boolean;
}

class DatabaseManager {
  private databases: Map<string, Database> = new Map();

  constructor() {
    // Initialize with mock database structure
    this.databases.set('SALES_DB', {
      name: 'SALES_DB',
      schemas: [
        {
          name: 'PUBLIC',
          tables: [
            {
              name: 'CUSTOMERS',
              columns: [
                { name: 'CUSTOMER_ID', type: 'NUMBER', nullable: false },
                { name: 'NAME', type: 'VARCHAR', nullable: false },
                { name: 'COUNTRY', type: 'VARCHAR', nullable: true }
              ],
              rowCount: 1000
            },
            {
              name: 'ORDERS',
              columns: [
                { name: 'ORDER_ID', type: 'NUMBER', nullable: false },
                { name: 'CUSTOMER_ID', type: 'NUMBER', nullable: false },
                { name: 'AMOUNT', type: 'NUMBER', nullable: false },
                { name: 'STATUS', type: 'VARCHAR', nullable: false }
              ],
              rowCount: 5000
            }
          ]
        }
      ]
    });
  }

  async listDatabases(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Array.from(this.databases.keys());
  }

  async getDatabase(name: string): Promise<Database | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.databases.get(name);
  }

  async getTableSchema(database: string, schema: string, table: string): Promise<Table | undefined> {
    const db = this.databases.get(database);
    return db?.schemas
      .find(s => s.name === schema)
      ?.tables
      .find(t => t.name === table);
  }
}

export default new DatabaseManager();