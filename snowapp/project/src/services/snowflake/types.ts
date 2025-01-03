export interface SnowflakeWarehouse {
  name: string;
  size: 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large';
  status: 'Running' | 'Suspended' | 'Resuming' | 'Suspending';
  startTime?: Date;
  creditUsage: number;
}

export interface SnowflakeDatabase {
  name: string;
  schemas: SnowflakeSchema[];
}

export interface SnowflakeSchema {
  name: string;
  tables: SnowflakeTable[];
}

export interface SnowflakeTable {
  name: string;
  columns: SnowflakeColumn[];
  rowCount: number;
}

export interface SnowflakeColumn {
  name: string;
  type: string;
  nullable: boolean;
}

export interface QueryResult {
  columns: string[];
  rows: any[];
  rowCount: number;
  status: 'success' | 'error';
  message?: string;
}