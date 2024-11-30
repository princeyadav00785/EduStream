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
exports.createStreamService = void 0;
const uuid_1 = require("uuid");
const createStreamService = () => {
    const streams = new Map();
    const recordings = new Map();
    const startLiveStream = () => __awaiter(void 0, void 0, void 0, function* () {
        const streamId = (0, uuid_1.v4)();
        streams.set(streamId, { streamId, clients: new Set(), status: 'started' });
        console.log(`Live stream started with ID: ${streamId}`);
        return { streamId, status: 'started' };
    });
    const stopLiveStream = (streamId) => __awaiter(void 0, void 0, void 0, function* () {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.status = 'stopped';
        streams.delete(streamId);
        console.log(`Live stream stopped with ID: ${streamId}`);
        return { streamId, status: 'stopped' };
    });
    const recordStream = (streamId) => __awaiter(void 0, void 0, void 0, function* () {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        const recordingId = (0, uuid_1.v4)();
        recordings.set(recordingId, { recordingId, status: 'recording started' });
        console.log(`Recording started for stream ID: ${streamId} with recording ID: ${recordingId}`);
        return { recordingId, status: 'recording started' };
    });
    const addClientToStream = (streamId, client) => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.clients.add(client);
        console.log(`Client added to stream ID: ${streamId}`);
    };
    const broadcastToStream = (streamId, message, sender) => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.clients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
    return {
        startLiveStream,
        stopLiveStream,
        recordStream,
        addClientToStream,
        broadcastToStream,
    };
};
exports.createStreamService = createStreamService;
