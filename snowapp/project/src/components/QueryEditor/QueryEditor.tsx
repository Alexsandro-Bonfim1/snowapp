import React, { useState, useEffect } from 'react';
import { Play, Download, Copy, Code } from 'lucide-react';
import { executeQuery } from '../../services/snowflake/query';
import ResultsTable from './ResultsTable';
import QueryHistory from './QueryHistory';

const QueryEditor = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState([]);

  const handleExecute = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();
    
    try {
      const data = await executeQuery(query);
      setResults(data);
      
      if (data.status === 'error') {
        setError(data.message || 'Query execution failed');
      } else {
        setHistory([
          {
            sql: query,
            timestamp: new Date(),
            status: data.status,
            duration: Date.now() - startTime
          },
          ...history
        ]);
      }
    } catch (error) {
      setError(error.message);
      console.error('Query execution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(query);
  };

  const handleSelectFromHistory = (sql: string) => {
    setQuery(sql);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleExecute}
            disabled={!query.trim() || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isLoading ? 'Executing...' : 'Execute'}
          </button>
          <button 
            onClick={handleCopyQuery}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Copy SQL"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Format SQL">
            <Code className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download Results">
            <Download className="w-4 h-4" />
          </button>
        </div>
        
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query..."
          className="w-full h-40 p-4 font-mono text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        
        {results && !error && <ResultsTable results={results} />}
        <QueryHistory history={history} onSelectQuery={handleSelectFromHistory} />
      </div>
    </div>
  );
};

export default QueryEditor;