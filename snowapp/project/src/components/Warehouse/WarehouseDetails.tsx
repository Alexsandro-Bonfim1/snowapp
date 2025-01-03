import React, { useEffect, useState } from 'react';
import { Clock, CreditCard, Database, Activity } from 'lucide-react';
import type { Warehouse } from '../../services/snowflake/warehouse';
import WarehouseProcessing from './WarehouseProcessing';
import warehouseManager from '../../services/snowflake/warehouse';

interface WarehouseDetailsProps {
  warehouse: Warehouse;
  onClose: () => void;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({ warehouse, onClose }) => {
  const [metrics, setMetrics] = useState({
    creditUsage: warehouse.creditUsage || 0,
    activeTime: 0,
    queryCount: warehouse.metrics?.queryCount || 0
  });

  useEffect(() => {
    const updateMetrics = async () => {
      try {
        const newMetrics = await warehouseManager.getWarehouseMetrics(warehouse.name);
        setMetrics(newMetrics);
      } catch (error) {
        console.error('Failed to update metrics:', error);
      }
    };

    const interval = setInterval(updateMetrics, 5000);
    updateMetrics();

    return () => clearInterval(interval);
  }, [warehouse.name]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{warehouse.name} Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Credit Usage</span>
            </div>
            <p className="text-2xl font-semibold">{metrics.creditUsage.toFixed(2)}</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Uptime</span>
            </div>
            <p className="text-2xl font-semibold">
              {Math.floor(metrics.activeTime / 60)}m
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Size</span>
            </div>
            <p className="text-2xl font-semibold">{warehouse.size}</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">Queries</span>
            </div>
            <p className="text-2xl font-semibold">{metrics.queryCount}</p>
          </div>
        </div>

        {warehouse.status === 'Running' && (
          <div className="mt-8">
            <WarehouseProcessing warehouseName={warehouse.name} />
          </div>
        )}

        <div className="mt-8 space-y-4">
          <h4 className="font-medium">Configuration</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-suspend</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>Never</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-resume</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetails;