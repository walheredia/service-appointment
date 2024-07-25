import { Router } from 'express';
import authMiddleware from '../../middlewares/auth';
import agendaController from './agenda.controller';

const router = Router();
//router.use(authMiddleware);

router.post('/', agendaController.agenda);
router.patch('/', agendaController.actualizaAgenda);
router.delete('/', agendaController.eliminaAgenda);

export default router;
