import { Router } from 'express';
import { DatabaseController } from '../controllers/database.controller';

const router = Router();
const controller = new DatabaseController();

router.get('/', controller.listDatabases);
router.get('/:name', controller.getDatabase);
router.get('/:database/schemas/:schema/tables/:table', controller.getTableSchema);

export default router;