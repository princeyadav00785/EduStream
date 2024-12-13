import { Router } from 'express';
import { startLiveStream, stopLiveStream, recordStream, addClientToStream, broadcastToStream } from '../controllers/streamController';

const router = Router();

router.post('/start', startLiveStream);
router.post('/stop', stopLiveStream);
router.post('/record', recordStream);
router.post('/addClient',addClientToStream);
router.post('/broadcastStream',broadcastToStream);

export default router;
