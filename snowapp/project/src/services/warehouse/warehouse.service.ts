import type { Warehouse } from '../snowflake/warehouse';

class WarehouseService {
  private warehouses: Map<string, Warehouse> = new Map();

  constructor() {
    // Initialize with default warehouses
    this.warehouses.set('COMPUTE_WH', {
      name: 'COMPUTE_WH',
      size: 'X-Small',
      status: 'Running',
      startTime: new Date(),
      creditUsage: 1.2,
      metrics: {
        queryCount: 150,
        activeQueries: 3,
        queuedQueries: 0
      }
    });
  }

  async createWarehouse(name: string, size: string): Promise<Warehouse> {
    if (this.warehouses.has(name)) {
      throw new Error(`Warehouse ${name} already exists`);
    }

    const warehouse: Warehouse = {
      name,
      size: size as any,
      status: 'Suspended',
      creditUsage: 0,
      metrics: {
        queryCount: 0,
        activeQueries: 0,
        queuedQueries: 0
      }
    };

    this.warehouses.set(name, warehouse);
    return warehouse;
  }

  async getWarehouse(name: string): Promise<Warehouse | undefined> {
    return this.warehouses.get(name);
  }

  async listWarehouses(): Promise<Warehouse[]> {
    return Array.from(this.warehouses.values());
  }

  async startWarehouse(name: string): Promise<Warehouse> {
    const warehouse = this.warehouses.get(name);
    if (!warehouse) {
      throw new Error(`Warehouse ${name} not found`);
    }

    warehouse.status = 'Running';
    warehouse.startTime = new Date();
    this.warehouses.set(name, warehouse);
    return warehouse;
  }

  async suspendWarehouse(name: string): Promise<Warehouse> {
    const warehouse = this.warehouses.get(name);
    if (!warehouse) {
      throw new Error(`Warehouse ${name} not found`);
    }

    warehouse.status = 'Suspended';
    delete warehouse.startTime;
    this.warehouses.set(name, warehouse);
    return warehouse;
  }

  async deleteWarehouse(name: string): Promise<void> {
    if (!this.warehouses.has(name)) {
      throw new Error(`Warehouse ${name} not found`);
    }

    this.warehouses.delete(name);
  }
}

export const warehouseService = new WarehouseService();