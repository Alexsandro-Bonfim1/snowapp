import React from 'react';
import { BarChart, Clock, DollarSign } from 'lucide-react';

interface WarehouseMetricsProps {
  metrics: {
    creditUsage: number;
    activeTime: number;
    queryCount: number;
  };
}

const WarehouseMetrics: React.FC<WarehouseMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Credits Used</p>
          <p className="text-lg font-semibold">{metrics.creditUsage.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Active Time</p>
          <p className="text-lg font-semibold">{Math.floor(metrics.activeTime / 60)}m</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <BarChart className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Queries Run</p>
          <p className="text-lg font-semibold">{metrics.queryCount}</p>
        </div>
      </div>
    </div>
  );
};

export default WarehouseMetrics;