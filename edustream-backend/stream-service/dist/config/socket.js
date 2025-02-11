"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocketMap = exports.io = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const userSocketMap = new Map();
exports.userSocketMap = userSocketMap;
const initializeSocket = (server) => {
    exports.io = io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on('registerSocket', ({ userId }) => {
            userSocketMap.set(userId, socket.id);
        });
        socket.on('joinSession', (sessionId) => {
            socket.join(sessionId);
            console.log(`User joined session: ${sessionId}`);
        });
        socket.on('leaveSession', (sessionId) => {
            socket.leave(sessionId);
            console.log(`User left session: ${sessionId}`);
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            for (let [userId, id] of userSocketMap.entries()) {
                if (id === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
