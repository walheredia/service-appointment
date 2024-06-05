import { Router } from 'express';
import healthController from './health.controller';
import authMiddleware from '../../middlewares/auth';

const router = Router();

//router.use(authMiddleware);
router.get('/', healthController.health);

export default router;
