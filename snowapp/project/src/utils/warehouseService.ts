import warehouseManager, { Warehouse } from '../services/snowflake/warehouse';

export async function getWarehouses(): Promise<Warehouse[]> {
  try {
    return await warehouseManager.listWarehouses();
  } catch (error) {
    console.error('Failed to fetch warehouses:', error);
    throw error;
  }
}

export async function startWarehouse(name: string): Promise<Warehouse> {
  try {
    return await warehouseManager.startWarehouse(name);
  } catch (error) {
    console.error('Failed to start warehouse:', error);
    throw error;
  }
}

export async function suspendWarehouse(name: string): Promise<Warehouse> {
  try {
    return await warehouseManager.suspendWarehouse(name);
  } catch (error) {
    console.error('Failed to suspend warehouse:', error);
    throw error;
  }
}

export async function getWarehouseMetrics(name: string) {
  try {
    return await warehouseManager.getWarehouseMetrics(name);
  } catch (error) {
    console.error('Failed to get warehouse metrics:', error);
    throw error;
  }
}