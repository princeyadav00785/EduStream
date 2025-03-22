import { Router } from 'express';
import { 
    createSession, joinSession, toggleSessionStatus, getAllSessions, getAllActiveSessions, 
    getSessionInfo, searchSessions, kickOutUser, blockUser, endSession 
} from '../controllers/sessionControllers';
import { isInstructor, isProfessor } from '../middlewares/isInstructor';
import { getAllRecordings, startRecording, stopRecording, 
    // getRecordingStatus, listRecordings, getRecording,livekitWebhook 
} from "../controllers/recordingController";

// import * as controllers from '../controllers/sessionControllers';
// console.log(controllers); 

const router = Router();

router.post('/create-session', isProfessor,createSession);
router.post('/join', joinSession);
router.patch('/toggle-status/:sessionId', isInstructor, toggleSessionStatus);
router.get('/all', getAllSessions);
router.get('/active', getAllActiveSessions);
router.get('/session-info/:sessionId', getSessionInfo);
router.get('/search', searchSessions);
router.post('/kick-out', isInstructor, kickOutUser);
router.post('/block', isInstructor, blockUser);
router.patch('/end/:sessionId', isInstructor, endSession);

// Session Recording Routes ...
// Start Recording
router.post("/recording/start", startRecording);
// Stop Recording
router.post("/recording/stop", stopRecording);
// Get Recording Status
// router.get("/recording/status/:recordingId", getRecordingStatus);
// // List All Recordings
router.get("/recording/list", getAllRecordings);
// router.get("/recording/stream/:id", streamRecording);

// // Get Specific Recording
// router.get("/recording/:recordingId", getRecording);
// // Webhook to receive LiveKit recording updates
// router.post("/recording/webhook", livekitWebhook);

export default router;
