import connection from './connection';
import { generateMockData } from './mockData';
import type { QueryResult } from './types';

export async function executeQuery(sql: string): Promise<QueryResult> {
  try {
    // Ensure connection is initialized
    await connection.initializeDefaultConnection();

    if (!connection.isConnected()) {
      throw new Error('Not connected to Snowflake');
    }

    // Simulate query execution delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Parse the query to determine the type
    const normalizedSQL = sql.toLowerCase().trim();
    
    if (normalizedSQL.startsWith('select')) {
      return generateMockData(sql);
    } else if (normalizedSQL.startsWith('create')) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        status: 'success',
        message: 'Object created successfully'
      };
    } else if (normalizedSQL.startsWith('insert')) {
      return {
        columns: [],
        rows: [],
        rowCount: 1,
        status: 'success',
        message: '1 row inserted successfully'
      };
    }

    throw new Error('Unsupported query type');
  } catch (error) {
    console.error('Query execution error:', error.message);
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      status: 'error',
      message: error.message
    };
  }
}