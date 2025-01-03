import { useState, useEffect } from 'react';
import { getWarehouses, startWarehouse as startWH, suspendWarehouse as suspendWH } from '../utils/warehouseService';

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState([
    { name: 'COMPUTE_WH', size: 'X-Small', status: 'Running' },
    { name: 'LOADING_WH', size: 'Large', status: 'Suspended' },
    { name: 'REPORTING_WH', size: 'Medium', status: 'Suspended' },
  ]);

  const startWarehouse = async (name: string) => {
    try {
      await startWH(name);
      setWarehouses(warehouses.map(wh => 
        wh.name === name ? { ...wh, status: 'Running' } : wh
      ));
    } catch (error) {
      console.error('Failed to start warehouse:', error);
    }
  };

  const suspendWarehouse = async (name: string) => {
    try {
      await suspendWH(name);
      setWarehouses(warehouses.map(wh => 
        wh.name === name ? { ...wh, status: 'Suspended' } : wh
      ));
    } catch (error) {
      console.error('Failed to suspend warehouse:', error);
    }
  };

  return { warehouses, startWarehouse, suspendWarehouse };
};