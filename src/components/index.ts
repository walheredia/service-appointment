import { Router } from 'express';
import authenticationRoutes from './authentication/authentication.api';
import healthRoutes from './health/health.api';

const router = Router();

router.use('/auth', authenticationRoutes);
router.use('/health', healthRoutes);

export default router;
