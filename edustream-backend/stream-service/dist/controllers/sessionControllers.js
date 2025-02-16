"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMuteUser = exports.getSessionAnalytics = exports.endSession = exports.blockUser = exports.kickOutUser = exports.searchSessions = exports.getSessionInfo = exports.getAllActiveSessions = exports.getAllSessions = exports.leaveSession = exports.toggleSessionStatus = exports.approveUser = exports.requestToJoin = exports.joinSession = exports.createSession = void 0;
const sessionService_1 = __importDefault(require("../services/sessionService"));
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        var instructorId = user.id.toString();
        // const role =user.role;
        const { title, description, socketId, instructorName, maxParticipants } = req.body;
        const session = yield sessionService_1.default.createSession(title, description, instructorId, socketId, instructorName, maxParticipants);
        res.status(201).json({ message: "Session created", session });
    }
    catch (error) {
        console.error("Error in createSession:", error);
        res.status(500).json({ message: "Could not create session" });
    }
});
exports.createSession = createSession;
const joinSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId, socketId } = req.body;
        const session = yield sessionService_1.default.joinSession(sessionId, userId, socketId);
        res.status(200).json({ message: "Joined session successfully", session });
    }
    catch (error) {
        console.error("Error in joinSession:", error);
        res.status(500).json({ message: "Could not join session" });
    }
});
exports.joinSession = joinSession;
const requestToJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId } = req.body;
        yield sessionService_1.default.requestToJoinSession(sessionId, userId);
        res.json({ message: "Request sent" });
    }
    catch (error) {
        console.error("Error in requestToJoin:", error);
        res.status(500).json({ message: "Could not send request" });
    }
});
exports.requestToJoin = requestToJoin;
const approveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId, socketId } = req.body;
        yield sessionService_1.default.approveUser(sessionId, userId, socketId);
        res.json({ message: "User approved" });
    }
    catch (error) {
        console.error("Error in approveUser:", error);
        res.status(500).json({ message: "Could not approve user" });
    }
});
exports.approveUser = approveUser;
const toggleSessionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield sessionService_1.default.toggleSessionStatus(req.params.sessionId);
        res.status(200).json({ message: "Session status updated", session });
    }
    catch (error) {
        console.error("Error in toggleSessionStatus:", error);
        res.status(500).json({ message: "Could not update session status" });
    }
});
exports.toggleSessionStatus = toggleSessionStatus;
const leaveSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId } = req.body;
        yield sessionService_1.default.leaveSession(sessionId, userId);
        res.json({ message: "Left session" });
    }
    catch (error) {
        console.error("Error in leaveSession:", error);
        res.status(500).json({ message: "Could not leave session" });
    }
});
exports.leaveSession = leaveSession;
const getAllSessions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield sessionService_1.default.getAllSessions();
        res.status(200).json(sessions);
    }
    catch (error) {
        console.error("Error in getAllSessions:", error);
        res.status(500).json({ message: "Could not fetch sessions" });
    }
});
exports.getAllSessions = getAllSessions;
const getAllActiveSessions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield sessionService_1.default.getAllActiveSessions();
        res.status(200).json(sessions);
    }
    catch (error) {
        console.error("Error in getAllActiveSessions:", error);
        res.status(500).json({ message: "Could not fetch active sessions" });
    }
});
exports.getAllActiveSessions = getAllActiveSessions;
const getSessionInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield sessionService_1.default.getSessionById(req.params.sessionId);
        res.status(200).json(session);
    }
    catch (error) {
        console.error("Error in getSessionInfo:", error);
        res.status(500).json({ message: "Could not fetch session details" });
    }
});
exports.getSessionInfo = getSessionInfo;
const searchSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const results = yield sessionService_1.default.searchSessions(query);
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error in searchSessions:", error);
        res.status(500).json({ message: "Could not search sessions" });
    }
});
exports.searchSessions = searchSessions;
const kickOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId } = req.body;
        yield sessionService_1.default.kickOutUser(sessionId, userId);
        res.status(200).json({ message: "User removed from session" });
    }
    catch (error) {
        console.error("Error in kickOutUser:", error);
        res.status(500).json({ message: "Could not remove user" });
    }
});
exports.kickOutUser = kickOutUser;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId } = req.body;
        yield sessionService_1.default.blockUser(sessionId, userId);
        res.status(200).json({ message: "User blocked" });
    }
    catch (error) {
        console.error("Error in blockUser:", error);
        res.status(500).json({ message: "Could not block user" });
    }
});
exports.blockUser = blockUser;
const endSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sessionService_1.default.endSession(req.params.sessionId);
        res.status(200).json({ message: "Session ended" });
    }
    catch (error) {
        console.error("Error in endSession:", error);
        res.status(500).json({ message: "Could not end session" });
    }
});
exports.endSession = endSession;
const getSessionAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        const analytics = yield sessionService_1.default.getSessionAnalytics(sessionId);
        res.json(analytics);
    }
    catch (error) {
        console.error("Error in getSessionAnalytics:", error);
        res.status(500).json({ message: "Couldn't get session analytics" });
    }
});
exports.getSessionAnalytics = getSessionAnalytics;
const toggleMuteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, userId } = req.body;
        yield sessionService_1.default.toggleMuteUser(sessionId, userId);
        res.json({ message: "User mute state toggled" });
    }
    catch (error) {
        console.error("Error in toggleMuteUser:", error);
        res.status(500).json({ message: "Couldn't toggle mute user" });
    }
});
exports.toggleMuteUser = toggleMuteUser;
