import React, { useState } from 'react';
import { SAMPLE_DATABASES } from '../services/snowflake/mockData/sampleData';
import { Database, Table } from 'lucide-react';
import DatabaseDetails from '../components/Database/DatabaseDetails';
import { useNavigate } from 'react-router-dom';

const Databases = () => {
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const navigate = useNavigate();

  const handleExecuteQuery = (query: string) => {
    navigate('/', { state: { query } });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Database Explorer</h1>
      
      <div className="grid gap-6">
        {Object.values(SAMPLE_DATABASES).map((database) => (
          <div 
            key={database.name} 
            className="bg-white rounded-lg shadow-sm border cursor-pointer hover:border-blue-300"
            onClick={() => setSelectedDatabase(database)}
          >
            <div className="p-4 border-b flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">{database.name}</h2>
            </div>
            
            <div className="p-4">
              {database.schemas.map((schema) => (
                <div key={schema.name} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{schema.name}</h3>
                  <div className="space-y-2">
                    {schema.tables.map((table) => (
                      <div key={table.name} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                        <Table className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{table.name}</span>
                        <span className="text-xs text-gray-500">({table.rowCount.toLocaleString()} rows)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedDatabase && (
        <DatabaseDetails
          database={selectedDatabase}
          onClose={() => setSelectedDatabase(null)}
          onExecuteQuery={handleExecuteQuery}
        />
      )}
    </div>
  );
};

export default Databases;