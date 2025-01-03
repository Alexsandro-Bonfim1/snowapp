import { executeQuery } from '../services/snowflake/query';
import connection from '../services/snowflake/connection';

export async function initializeConnection() {
  return connection.connect({
    account: 'demo_account',
    username: 'demo_user',
    warehouse: 'COMPUTE_WH',
    database: 'SALES_DB',
    schema: 'PUBLIC'
  });
}

export async function runQuery(sql: string) {
  try {
    const result = await executeQuery(sql);
    return result;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
}