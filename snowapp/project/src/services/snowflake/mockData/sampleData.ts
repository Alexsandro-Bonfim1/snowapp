export const SAMPLE_DATABASES = {
  SALES: {
    name: 'SALES',
    schemas: [
      {
        name: 'PUBLIC',
        tables: [
          {
            name: 'CUSTOMERS',
            columns: [
              { name: 'CUSTOMER_ID', type: 'NUMBER', nullable: false },
              { name: 'NAME', type: 'VARCHAR', nullable: false },
              { name: 'EMAIL', type: 'VARCHAR', nullable: false },
              { name: 'COUNTRY', type: 'VARCHAR', nullable: true }
            ],
            rowCount: 1000
          },
          {
            name: 'ORDERS',
            columns: [
              { name: 'ORDER_ID', type: 'NUMBER', nullable: false },
              { name: 'CUSTOMER_ID', type: 'NUMBER', nullable: false },
              { name: 'ORDER_DATE', type: 'DATE', nullable: false },
              { name: 'AMOUNT', type: 'NUMBER(10,2)', nullable: false },
              { name: 'STATUS', type: 'VARCHAR', nullable: false }
            ],
            rowCount: 5000
          }
        ]
      }
    ]
  },
  ANALYTICS: {
    name: 'ANALYTICS',
    schemas: [
      {
        name: 'REPORTS',
        tables: [
          {
            name: 'DAILY_SALES',
            columns: [
              { name: 'DATE', type: 'DATE', nullable: false },
              { name: 'TOTAL_ORDERS', type: 'NUMBER', nullable: false },
              { name: 'TOTAL_AMOUNT', type: 'NUMBER(15,2)', nullable: false },
              { name: 'AVG_ORDER_VALUE', type: 'NUMBER(10,2)', nullable: false }
            ],
            rowCount: 365
          }
        ]
      }
    ]
  }
};