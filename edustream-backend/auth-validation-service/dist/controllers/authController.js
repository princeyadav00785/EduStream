"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res) => {
    console.log("inside validation service...");
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, userId: decoded.id, role: decoded.role });
    }
    catch (err) {
        res.status(403).json({ valid: false, error: "Invalid token" });
    }
};
exports.validateToken = validateToken;
