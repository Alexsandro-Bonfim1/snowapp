import React from 'react';
import { Table, Database as DatabaseIcon, HardDrive } from 'lucide-react';
import type { Database, Table as TableType } from '../../services/snowflake/database';

interface DatabaseDetailsProps {
  database: Database;
  onClose: () => void;
  onExecuteQuery: (query: string) => void;
}

const DatabaseDetails: React.FC<DatabaseDetailsProps> = ({ database, onClose, onExecuteQuery }) => {
  const handleTableClick = (tableName: string) => {
    onExecuteQuery(`SELECT * FROM ${database.name}.PUBLIC.${tableName} LIMIT 10`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <DatabaseIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">{database.name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-6">
          {database.schemas.map((schema) => (
            <div key={schema.name} className="border rounded-lg">
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="font-medium">{schema.name} Schema</h4>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {schema.tables.map((table) => (
                    <div
                      key={table.name}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => handleTableClick(table.name)}
                    >
                      <div className="flex items-center gap-3">
                        <Table className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{table.name}</p>
                          <p className="text-sm text-gray-500">{table.columns.length} columns</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {table.rowCount.toLocaleString()} rows
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatabaseDetails;