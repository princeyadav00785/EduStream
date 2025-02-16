import { Router } from 'express';
import { 
    createSession, joinSession, toggleSessionStatus, getAllSessions, getAllActiveSessions, 
    getSessionInfo, searchSessions, kickOutUser, blockUser, endSession 
} from '../controllers/sessionControllers';
import { isInstructor } from '../middlewares/isInstructor';
// import * as controllers from '../controllers/sessionControllers';
// console.log(controllers); 

const router = Router();

router.post('/create-session', createSession);
router.post('/join', joinSession);
router.patch('/toggle-status/:sessionId', isInstructor, toggleSessionStatus);
router.get('/all', getAllSessions);
router.get('/active', getAllActiveSessions);
router.get('/session-info/:sessionId', getSessionInfo);
router.get('/search', searchSessions);
router.post('/kick-out', isInstructor, kickOutUser);
router.post('/block', isInstructor, blockUser);
router.patch('/end/:sessionId', isInstructor, endSession);

export default router;
