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
exports.getNotifications = exports.sendNotification = void 0;
const notificationService_1 = __importDefault(require("../services/notificationService"));
const sendNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, type, message } = req.body;
    try {
        const notification = yield notificationService_1.default.createNotification(userId, type, message);
        res.status(201).json({ notification });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send notification' });
    }
});
exports.sendNotification = sendNotification;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const notifications = yield notificationService_1.default.getUserNotifications(userId);
        res.status(200).json({ notifications });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
});
exports.getNotifications = getNotifications;
