import { QueryResult } from '../types';

export function generateMockQueryResults(sql: string): QueryResult {
  const normalizedSQL = sql.toLowerCase();

  // Customer data
  if (normalizedSQL.includes('customers')) {
    return {
      columns: ['CUSTOMER_ID', 'NAME', 'EMAIL', 'COUNTRY'],
      rows: [
        { CUSTOMER_ID: 1, NAME: 'Acme Corp', EMAIL: 'contact@acme.com', COUNTRY: 'USA' },
        { CUSTOMER_ID: 2, NAME: 'Global Tech', EMAIL: 'info@globaltech.com', COUNTRY: 'UK' },
        { CUSTOMER_ID: 3, NAME: 'Euro Shop', EMAIL: 'sales@euroshop.eu', COUNTRY: 'Germany' }
      ],
      rowCount: 3,
      status: 'success'
    };
  }

  // Order data
  if (normalizedSQL.includes('orders')) {
    return {
      columns: ['ORDER_ID', 'CUSTOMER_ID', 'ORDER_DATE', 'AMOUNT', 'STATUS'],
      rows: [
        { ORDER_ID: 1001, CUSTOMER_ID: 1, ORDER_DATE: '2024-03-15', AMOUNT: 1500.00, STATUS: 'completed' },
        { ORDER_ID: 1002, CUSTOMER_ID: 2, ORDER_DATE: '2024-03-16', AMOUNT: 2300.50, STATUS: 'pending' },
        { ORDER_ID: 1003, CUSTOMER_ID: 1, ORDER_DATE: '2024-03-16', AMOUNT: 750.25, STATUS: 'completed' }
      ],
      rowCount: 3,
      status: 'success'
    };
  }

  // Analytics data
  if (normalizedSQL.includes('daily_sales')) {
    return {
      columns: ['DATE', 'TOTAL_ORDERS', 'TOTAL_AMOUNT', 'AVG_ORDER_VALUE'],
      rows: [
        { DATE: '2024-03-15', TOTAL_ORDERS: 125, TOTAL_AMOUNT: 18750.00, AVG_ORDER_VALUE: 150.00 },
        { DATE: '2024-03-16', TOTAL_ORDERS: 142, TOTAL_AMOUNT: 21300.00, AVG_ORDER_VALUE: 150.00 }
      ],
      rowCount: 2,
      status: 'success'
    };
  }

  // Default response for unknown queries
  return {
    columns: ['RESULT'],
    rows: [{ RESULT: 'Query executed successfully' }],
    rowCount: 1,
    status: 'success'
  };
}