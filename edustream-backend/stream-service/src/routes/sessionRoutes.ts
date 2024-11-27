import { Router } from 'express';
import { createSession, endSession } from '../controllers/sessionControllers';

const router = Router();

router.post('/', createSession);
router.delete('/:sessionId', endSession);

export default router;
