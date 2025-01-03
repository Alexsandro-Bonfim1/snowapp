import { Router } from 'express';
import { WarehouseController } from '../controllers/warehouse.controller';

const router = Router();
const controller = new WarehouseController();

router.get('/', controller.listWarehouses);
router.put('/:name/start', controller.startWarehouse);
router.put('/:name/suspend', controller.suspendWarehouse);
router.get('/:name/metrics', controller.getMetrics);

export default router;