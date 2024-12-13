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
exports.broadcastToStream = exports.addClientToStream = exports.recordStream = exports.stopLiveStream = exports.startLiveStream = void 0;
const streamService_1 = require("../services/streamService");
const streamService = (0, streamService_1.createStreamService)();
const startLiveStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const streamData = yield streamService.startLiveStream();
        res.status(200).json({ message: 'Live stream started', streamData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not start live stream' });
    }
});
exports.startLiveStream = startLiveStream;
const stopLiveStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { streamId } = req.body;
        const result = yield streamService.stopLiveStream(streamId);
        res.status(200).json({ message: 'Live stream stopped', result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Could not stop live stream: ${error.message}` });
    }
});
exports.stopLiveStream = stopLiveStream;
const recordStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { streamId } = req.body;
        const recordingData = yield streamService.recordStream(streamId);
        res.status(200).json({ message: 'Recording started', recordingData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Could not start recording: ${error.message}` });
    }
});
exports.recordStream = recordStream;
const addClientToStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { streamId, client } = req.body;
        const clientAddedToStream = streamService.addClientToStream(streamId, client);
        res.status(200).json({ message: 'Client Added to stream', clientAddedToStream });
    }
    catch (error) {
        res.status(500).json({ message: `Cant add client to Stream: ${error.message}` });
    }
});
exports.addClientToStream = addClientToStream;
const broadcastToStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { streamId, message, sender } = req.body;
        const broadcastMsg = streamService.broadcastToStream(streamId, message, sender);
        res.status(200).json({ message: 'Message Broadcast to Stream', broadcastMsg });
    }
    catch (error) {
        res.status(500).json({ message: `Cant sent Message Broadcast to Stream: ${error.message}` });
    }
});
exports.broadcastToStream = broadcastToStream;
