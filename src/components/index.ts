import { Router } from 'express';
import authenticationRoutes from './authentication/authentication.api';
import healthRoutes from './health/health.api';
import agendaRoutes from './agenda/agenda.api';

const router = Router();

router.use('/auth', authenticationRoutes);
router.use('/health', healthRoutes);
router.use('/agenda', agendaRoutes);

export default router;
