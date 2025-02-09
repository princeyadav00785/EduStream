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
exports.isInstructor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isInstructor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const userId = req.body.userId || req.query.userId;
    try {
        const session = yield prisma.session.findUnique({ where: { id: sessionId } });
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        if (session.instructorId !== userId) {
            res.status(403).json({ message: 'Unauthorized: Only the instructor can perform this action' });
            return;
        }
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Error in isInstructor middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isInstructor = isInstructor;
