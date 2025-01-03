export interface Warehouse {
  name: string;
  size: 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large';
  status: 'Running' | 'Suspended' | 'Resuming' | 'Suspending';
  startTime?: Date;
  creditUsage: number;
  metrics?: {
    queryCount: number;
    activeQueries: number;
    queuedQueries: number;
  };
}

class WarehouseManager {
  private warehouses: Map<string, Warehouse> = new Map();

  constructor() {
    // Initialize with some mock warehouses
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
    
    this.warehouses.set('LOADING_WH', {
      name: 'LOADING_WH',
      size: 'Large',
      status: 'Suspended',
      creditUsage: 0,
      metrics: {
        queryCount: 0,
        activeQueries: 0,
        queuedQueries: 0
      }
    });
  }

  async listWarehouses(): Promise<Warehouse[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return Array.from(this.warehouses.values());
    } catch (error) {
      console.error('Error listing warehouses:', error);
      throw new Error('Failed to list warehouses');
    }
  }

  async startWarehouse(name: string): Promise<Warehouse> {
    try {
      const warehouse = this.warehouses.get(name);
      if (!warehouse) {
        throw new Error(`Warehouse ${name} not found`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      warehouse.status = 'Running';
      warehouse.startTime = new Date();
      warehouse.creditUsage = 0;
      warehouse.metrics = {
        queryCount: 0,
        activeQueries: 0,
        queuedQueries: 0
      };
      
      this.warehouses.set(name, warehouse);
      return warehouse;
    } catch (error) {
      console.error('Error starting warehouse:', error);
      throw new Error(`Failed to start warehouse ${name}`);
    }
  }

  async suspendWarehouse(name: string): Promise<Warehouse> {
    try {
      const warehouse = this.warehouses.get(name);
      if (!warehouse) {
        throw new Error(`Warehouse ${name} not found`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      warehouse.status = 'Suspended';
      delete warehouse.startTime;
      warehouse.creditUsage = 0;
      warehouse.metrics = {
        queryCount: 0,
        activeQueries: 0,
        queuedQueries: 0
      };
      
      this.warehouses.set(name, warehouse);
      return warehouse;
    } catch (error) {
      console.error('Error suspending warehouse:', error);
      throw new Error(`Failed to suspend warehouse ${name}`);
    }
  }

  async getWarehouseMetrics(name: string): Promise<{
    creditUsage: number;
    activeTime: number;
    queryCount: number;
  }> {
    try {
      const warehouse = this.warehouses.get(name);
      if (!warehouse) {
        throw new Error(`Warehouse ${name} not found`);
      }

      return {
        creditUsage: warehouse.creditUsage || 0,
        activeTime: warehouse.startTime ? 
          Math.floor((new Date().getTime() - warehouse.startTime.getTime()) / 1000) : 0,
        queryCount: warehouse.metrics?.queryCount || 0
      };
    } catch (error) {
      console.error('Error getting warehouse metrics:', error);
      throw new Error(`Failed to get metrics for warehouse ${name}`);
    }
  }

  // Update warehouse metrics periodically
  private updateWarehouseMetrics(warehouse: Warehouse) {
    if (warehouse.status === 'Running') {
      warehouse.creditUsage += 0.1;
      if (warehouse.metrics) {
        warehouse.metrics.queryCount += Math.floor(Math.random() * 5);
        warehouse.metrics.activeQueries = Math.floor(Math.random() * 10);
        warehouse.metrics.queuedQueries = Math.floor(Math.random() * 3);
      }
    }
  }

  startMetricsCollection() {
    setInterval(() => {
      this.warehouses.forEach(warehouse => {
        this.updateWarehouseMetrics(warehouse);
      });
    }, 5000);
  }
}

const warehouseManager = new WarehouseManager();
warehouseManager.startMetricsCollection();

export default warehouseManager;