import { Request, Response } from 'express';
import { DatabaseService } from '../services/database.service';

export class DatabaseController {
  private service = new DatabaseService();

  listDatabases = async (req: Request, res: Response) => {
    try {
      const databases = await this.service.listDatabases();
      res.json(databases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getDatabase = async (req: Request, res: Response) => {
    try {
      const database = await this.service.getDatabase(req.params.name);
      res.json(database);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getTableSchema = async (req: Request, res: Response) => {
    try {
      const { database, schema, table } = req.params;
      const tableSchema = await this.service.getTableSchema(database, schema, table);
      res.json(tableSchema);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}