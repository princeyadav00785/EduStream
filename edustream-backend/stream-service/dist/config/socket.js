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
        // Register user socket
        socket.on('registerSocket', ({ userId }) => {
            userSocketMap.set(userId, socket.id);
        });
        // User joins a session (room)
        socket.on('joinSession', (sessionId) => {
            socket.join(sessionId);
            console.log(`User joined session: ${sessionId}`);
        });
        // User leaves a session (room)
        socket.on('leaveSession', (sessionId) => {
            socket.leave(sessionId);
            console.log(`User left session: ${sessionId}`);
        });
        // Handle WebRTC signaling
        // socket.on('offer', ({ sessionId, offer }) => {
        //     console.log(`Received offer from user in session ${sessionId}`);
        //     socket.to(sessionId).emit('offer', { offer });
        // });
        // socket.on('answer', ({ sessionId, answer }) => {
        //     console.log(`Received answer in session ${sessionId}`);
        //     socket.to(sessionId).emit('answer', { answer });
        // });
        // socket.on('ice-candidate', ({ sessionId, candidate }) => {
        //     console.log(`Received ICE candidate in session ${sessionId}`);
        //     socket.to(sessionId).emit('ice-candidate', { candidate });
        // });
        // socket.on('start-stream', ({ sessionId }) => {
        //     console.log(`Starting stream in session ${sessionId}`);
        //     socket.to(sessionId).emit('start-stream');
        // });
        // socket.on('end-stream', ({ sessionId }) => {
        //     console.log(`Ending stream in session ${sessionId}`);
        //     socket.to(sessionId).emit('end-stream');
        // });
        // Handle disconnection
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
