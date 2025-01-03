import { Router } from 'express';
import { ConnectionController } from '../controllers/connection.controller';

const router = Router();
const controller = new ConnectionController();

router.post('/', controller.connect);

export default router;