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
const prisma = new client_1.PrismaClient();
class SessionService {
    createSession(sessionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionId = (0, uuid_1.v4)();
                const session = yield prisma.session.create({
                    data: Object.assign(Object.assign({ id: sessionId }, sessionData), { isActive: true }),
                });
                return session;
            }
            catch (error) {
                console.error('Error creating session:', error);
                throw new Error('Failed to create session');
            }
        });
    }
    getSessionById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield prisma.session.findUnique({
                    where: { id: sessionId },
                });
                if (!session)
                    throw new Error('Session not found');
                return session;
            }
            catch (error) {
                console.error('Error fetching session:', error);
                throw error;
            }
        });
    }
    endSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield prisma.session.update({
                    where: { id: sessionId },
                    data: { isActive: false, endTime: new Date() },
                });
                return session;
            }
            catch (error) {
                console.error('Error ending session:', error);
                throw new Error('Failed to end session');
            }
        });
    }
    getAllActiveSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessions = yield prisma.session.findMany({
                    where: { isActive: true },
                });
                return sessions;
            }
            catch (error) {
                console.error('Error fetching active sessions:', error);
                throw new Error('Failed to fetch active sessions');
            }
        });
    }
}
exports.default = new SessionService();
