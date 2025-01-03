import React, { useState } from 'react';
import { Power, PauseCircle, BarChart } from 'lucide-react';
import { useWarehouses } from '../../hooks/useWarehouses';
import WarehouseDetails from './WarehouseDetails';

const WarehouseManager = () => {
  const { warehouses, startWarehouse, suspendWarehouse } = useWarehouses();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Virtual Warehouses</h2>
      </div>
      <div className="divide-y">
        {warehouses.map((warehouse) => (
          <div key={warehouse.name} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{warehouse.name}</h3>
              <p className="text-sm text-gray-500">Size: {warehouse.size}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                warehouse.status === 'Running' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {warehouse.status}
              </span>
              <button
                onClick={() => setSelectedWarehouse(warehouse)}
                className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
              >
                <BarChart className="w-5 h-5" />
              </button>
              {warehouse.status === 'Suspended' ? (
                <button
                  onClick={() => startWarehouse(warehouse.name)}
                  className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                >
                  <Power className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => suspendWarehouse(warehouse.name)}
                  className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                >
                  <PauseCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedWarehouse && (
        <WarehouseDetails
          warehouse={selectedWarehouse}
          onClose={() => setSelectedWarehouse(null)}
        />
      )}
    </div>
  );
};

export default WarehouseManager;