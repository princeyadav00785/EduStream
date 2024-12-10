import { Router } from 'express';
import { sendNotification, getNotifications } from '../controllers/notificationController';

const router = Router();

router.post('/send', sendNotification);
router.get('/:userId', getNotifications);

export default router;
