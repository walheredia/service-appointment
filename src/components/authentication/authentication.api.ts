import { Router } from 'express';
import authenticationController from './authentication.controller';

const router = Router();

router.post('/hash', authenticationController.hash);
router.post('/login', authenticationController.login);

export default router;
