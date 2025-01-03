import warehouseManager from '../../services/snowflake/warehouse';
import type { Warehouse } from '../../services/snowflake/warehouse';

export class WarehouseService {
  async listWarehouses(): Promise<Warehouse[]> {
    return warehouseManager.listWarehouses();
  }

  async startWarehouse(name: string): Promise<Warehouse> {
    return warehouseManager.startWarehouse(name);
  }

  async suspendWarehouse(name: string): Promise<Warehouse> {
    return warehouseManager.suspendWarehouse(name);
  }

  async getMetrics(name: string) {
    return warehouseManager.getWarehouseMetrics(name);
  }
}