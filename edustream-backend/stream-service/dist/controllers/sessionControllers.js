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
exports.endSession = exports.createSession = void 0;
const sessionService_1 = __importDefault(require("../services/sessionService"));
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield sessionService_1.default.createSession(req.body);
        res.status(201).json({ message: 'Session created', session });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create session' });
    }
});
exports.createSession = createSession;
const endSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sessionService_1.default.endSession(req.params.sessionId);
        res.status(200).json({ message: 'Session ended' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not end session' });
    }
});
exports.endSession = endSession;
