import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';
import type { Database, Table } from '../../services/snowflake/database';

export async function listDatabases(): Promise<string[]> {
  return apiClient.get<string[]>(ENDPOINTS.DATABASES);
}

export async function getDatabase(name: string): Promise<Database> {
  return apiClient.get<Database>(`${ENDPOINTS.DATABASES}/${name}`);
}

export async function getTableSchema(
  database: string,
  schema: string,
  table: string
): Promise<Table> {
  return apiClient.get<Table>(
    `${ENDPOINTS.DATABASES}/${database}/schemas/${schema}/tables/${table}`
  );
}