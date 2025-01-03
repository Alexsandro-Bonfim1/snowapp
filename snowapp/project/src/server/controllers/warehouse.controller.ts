import { Request, Response } from 'express';
import { WarehouseService } from '../services/warehouse.service';

export class WarehouseController {
  private service = new WarehouseService();

  listWarehouses = async (req: Request, res: Response) => {
    try {
      const warehouses = await this.service.listWarehouses();
      res.json(warehouses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  startWarehouse = async (req: Request, res: Response) => {
    try {
      const warehouse = await this.service.startWarehouse(req.params.name);
      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  suspendWarehouse = async (req: Request, res: Response) => {
    try {
      const warehouse = await this.service.suspendWarehouse(req.params.name);
      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getMetrics = async (req: Request, res: Response) => {
    try {
      const metrics = await this.service.getMetrics(req.params.name);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}