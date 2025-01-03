import { QueryResult } from './query';

interface MockDataGenerator {
  pattern: RegExp;
  generate: () => any[];
}

const mockDataGenerators: MockDataGenerator[] = [
  {
    pattern: /select.*from\s+customers/i,
    generate: () => [
      { customer_id: 1, name: 'Acme Corp', country: 'USA', total_orders: 156 },
      { customer_id: 2, name: 'Global Tech', country: 'UK', total_orders: 89 },
      { customer_id: 3, name: 'Euro Shop', country: 'Germany', total_orders: 234 }
    ]
  },
  {
    pattern: /select.*from\s+orders/i,
    generate: () => [
      { order_id: 1001, customer_id: 1, amount: 1500.00, status: 'completed' },
      { order_id: 1002, customer_id: 2, amount: 2300.50, status: 'pending' },
      { order_id: 1003, customer_id: 1, amount: 750.25, status: 'completed' }
    ]
  },
  {
    pattern: /select.*from\s+products/i,
    generate: () => [
      { product_id: 1, name: 'Widget Pro', price: 99.99, stock: 150 },
      { product_id: 2, name: 'Super Gadget', price: 199.99, stock: 75 },
      { product_id: 3, name: 'Tech Master', price: 299.99, stock: 50 }
    ]
  }
];

export function generateMockData(sql: string): QueryResult {
  // Find matching data generator
  const generator = mockDataGenerators.find(g => g.pattern.test(sql));
  
  if (generator) {
    const rows = generator.generate();
    return {
      columns: Object.keys(rows[0]),
      rows,
      rowCount: rows.length,
      status: 'success'
    };
  }

  // Default mock data for any other SELECT query
  const defaultRows = [
    { id: 1, value: 'Sample Data 1' },
    { id: 2, value: 'Sample Data 2' },
    { id: 3, value: 'Sample Data 3' }
  ];

  return {
    columns: Object.keys(defaultRows[0]),
    rows: defaultRows,
    rowCount: defaultRows.length,
    status: 'success'
  };
}