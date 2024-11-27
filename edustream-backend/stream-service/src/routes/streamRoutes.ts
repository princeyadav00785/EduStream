import { Router } from 'express';
import { startLiveStream, stopLiveStream, recordStream } from '../controllers/streamController';

const router = Router();

router.post('/start', startLiveStream);
router.post('/stop', stopLiveStream);
router.post('/record', recordStream);

export default router;
