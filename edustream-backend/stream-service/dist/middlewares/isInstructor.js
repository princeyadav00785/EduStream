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
exports.authMiddleware = exports.isInstructor = void 0;
const client_1 = require("@prisma/client");
const axios = require('axios');
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
        next();
    }
    catch (error) {
        console.error('Error in isInstructor middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isInstructor = isInstructor;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    console.log("inside middleware..");
    try {
        //  will Call the Auth Validation Microservice, would going to add this in all microservice...
        const response = yield axios.post("http://localhost:5004/api/validate-token", {}, { headers: { Authorization: token } });
        if (response.data.valid) {
            req.user = { id: response.data.userId, role: response.data.role };
            // console.log(`role of user : ${req.user.id}, ${req.user.role}`);
            next();
        }
        else {
            return res.status(403).json({ error: "Invalid token" });
        }
    }
    catch (err) {
        return res.status(403).json({ error: `Token validation failed: ${err}` });
    }
});
exports.authMiddleware = authMiddleware;
