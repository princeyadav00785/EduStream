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
exports.LIVEKIT_URL = exports.generateLiveKitToken = void 0;
const livekit_server_sdk_1 = require("livekit-server-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;
exports.LIVEKIT_URL = LIVEKIT_URL;
/**
 * we will generates a LiveKit JWT token for a user to join a session.
 * @param {string} userId - User's unique ID(validation service se).
 * @param {string} sessionId - Room (session) ID in LiveKit.
 * @returns {string} - JWT token for authentication.
 */
const generateLiveKitToken = (userId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = new livekit_server_sdk_1.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: userId });
    token.addGrant({ roomJoin: true, room: sessionId });
    return yield token.toJwt();
});
exports.generateLiveKitToken = generateLiveKitToken;
