import { Server } from 'socket.io';
import http from 'http';

let io: Server;

const userSocketMap = new Map<string, string>();

export const initializeSocket = (server: http.Server) => {
    io = new Server(server, {
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

export { io, userSocketMap };

