import { Request, Response } from 'express';
import { DatabaseFactory } from '../db/factory';
import type { DatabaseConfig } from '../db/types';

export class ConnectionController {
  async connect(req: Request, res: Response) {
    try {
      const config: DatabaseConfig = req.body;
      const adapter = DatabaseFactory.createAdapter(config.type);
      await adapter.connect(config);
      res.json({ status: 'success', message: 'Connected successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}