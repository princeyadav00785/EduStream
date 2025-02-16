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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const socket_1 = require("../config/socket");
const prisma = new client_1.PrismaClient();
class SessionService {
    createSession(title, description, instructorId, socketId, instructorName, maxParticipants) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`${title}, ${description}, ${instructorId} ,${socketId},${instructorName},${maxParticipants}`);
            return yield prisma.session.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    title,
                    description,
                    instructorName,
                    maxParticipants,
                    isActive: true,
                    instructorId,
                    clients: { [instructorId]: { socketId, muted: false } },
                    waitingList: [],
                },
            });
        });
    }
    joinSession(sessionId, userId, socketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            // const user = await axios.get(`http://user-service/api/users/${userId}`).then(res => res.data);
            // if (!user) throw new Error("User not found");
            // if (user.role === "banned") {
            //   throw new Error("You are banned from joining sessions");
            // }
            if (!socketId)
                throw new Error("WebSocket connection required");
            let clients = session.clients;
            clients[userId] = { socketId, muted: false };
            socket_1.io.to(sessionId).emit("userJoined", { userId });
            return yield prisma.session.update({
                where: { id: sessionId },
                data: { clients },
            });
        });
    }
    requestToJoinSession(sessionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            let waitingList = session.waitingList;
            if (!waitingList.includes(userId)) {
                waitingList.push(userId);
            }
            socket_1.io.to(sessionId).emit("userReqToJoin", { userId });
            return yield prisma.session.update({
                where: { id: sessionId },
                data: { waitingList },
            });
        });
    }
    approveUser(sessionId, userId, socketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            let waitingList = session.waitingList;
            let clients = session.clients;
            if (!waitingList.includes(userId))
                throw new Error("User is not in the waiting list");
            waitingList = waitingList.filter((id) => id !== userId);
            clients[userId] = { socketId, muted: false };
            yield prisma.session.update({
                where: { id: sessionId },
                data: { waitingList, clients },
            });
            socket_1.io.to(sessionId).emit("userApproved", { userId });
        });
    }
    toggleSessionStatus(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            return yield prisma.session.update({
                where: { id: sessionId },
                data: { isActive: !session.isActive },
            });
        });
    }
    getAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.session.findMany({ orderBy: { createdAt: "desc" } });
        });
    }
    getAllActiveSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.session.findMany({ where: { isActive: true } });
        });
    }
    getSessionById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.session.findUnique({ where: { id: sessionId } });
        });
    }
    searchSessions(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.session.findMany({
                where: {
                    OR: [
                        { title: { contains: query.title } },
                        { description: { contains: query.description } },
                        { instructorId: { contains: query.instructorId } },
                    ],
                },
            });
        });
    }
    kickOutUser(sessionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            const clients = session.clients;
            delete clients[userId];
            socket_1.io.to(sessionId).emit("userKickedOut", { userId });
            return yield prisma.session.update({
                where: { id: sessionId },
                data: { clients },
            });
        });
    }
    blockUser(sessionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            socket_1.io.to(sessionId).emit("userBlocked", { userId });
            return this.kickOutUser(sessionId, userId);
        });
    }
    endSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.session.delete({ where: { id: sessionId } });
            socket_1.io.to(sessionId).emit("sessionEnded", { sessionId });
        });
    }
    getSessionAnalytics(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            return {
                totalParticipants: session.clients ? Object.keys(session.clients).length : 0,
                sessionDuration: new Date().getTime() - new Date(session.createdAt).getTime(),
            };
        });
    }
    toggleMuteUser(sessionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            let clients = session.clients;
            if (!clients[userId])
                throw new Error("User not found in session");
            clients[userId].muted = !clients[userId].muted;
            yield prisma.session.update({
                where: { id: sessionId },
                data: { clients },
            });
            socket_1.io
                .to(sessionId)
                .emit("userMuted", { userId, muted: clients[userId].muted });
        });
    }
    leaveSession(sessionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session)
                throw new Error("Session not found");
            let clients = session.clients;
            delete clients[userId];
            yield prisma.session.update({
                where: { id: sessionId },
                data: { clients },
            });
            socket_1.io.to(sessionId).emit("userLeft", { userId });
        });
    }
}
exports.default = new SessionService();
