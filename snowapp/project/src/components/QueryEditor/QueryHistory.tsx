import React from 'react';
import { Clock, Check, X } from 'lucide-react';

interface QueryHistoryProps {
  history: {
    sql: string;
    timestamp: Date;
    status: 'success' | 'error';
    duration: number;
  }[];
  onSelectQuery: (sql: string) => void;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({ history, onSelectQuery }) => {
  return (
    <div className="border-t mt-4">
      <h3 className="text-sm font-medium text-gray-700 p-4">Query History</h3>
      <div className="max-h-60 overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={index}
            onClick={() => onSelectQuery(entry.sql)}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {entry.status === 'success' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <div>
                <p className="text-sm font-mono truncate max-w-md">{entry.sql}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{entry.duration}ms</span>
                  <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryHistory;