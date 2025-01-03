import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';
import type { QueryResult } from '../../services/snowflake/query';

export async function executeQuery(sql: string): Promise<QueryResult> {
  return apiClient.post<QueryResult>(ENDPOINTS.QUERY, { sql });
}

export async function initializeConnection(config: {
  account: string;
  username: string;
  warehouse: string;
  database: string;
  schema: string;
}): Promise<boolean> {
  return apiClient.post<boolean>(ENDPOINTS.CONNECTION, config);
}