"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionControllers_1 = require("../controllers/sessionControllers");
const isInstructor_1 = require("../middlewares/isInstructor");
// import * as controllers from '../controllers/sessionControllers';
// console.log(controllers); 
const router = (0, express_1.Router)();
router.post('/create-session', sessionControllers_1.createSession);
router.post('/join', sessionControllers_1.joinSession);
router.patch('/toggle-status/:sessionId', isInstructor_1.isInstructor, sessionControllers_1.toggleSessionStatus);
router.get('/all', sessionControllers_1.getAllSessions);
router.get('/active', sessionControllers_1.getAllActiveSessions);
router.get('/session-info/:sessionId', sessionControllers_1.getSessionInfo);
router.get('/search', sessionControllers_1.searchSessions);
router.post('/kick-out', isInstructor_1.isInstructor, sessionControllers_1.kickOutUser);
router.post('/block', isInstructor_1.isInstructor, sessionControllers_1.blockUser);
router.patch('/end/:sessionId', isInstructor_1.isInstructor, sessionControllers_1.endSession);
exports.default = router;
