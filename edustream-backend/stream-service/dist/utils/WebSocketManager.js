"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketManager = void 0;
const ws_1 = require("ws");
const createWebSocketManager = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    const clients = new Set();
    // Setup connection handlers
    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('Client connected');
        ws.on('message', (message) => {
            broadcast(message.toString(), ws);
        });
        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client disconnected');
        });
    });
    // Broadcast a message to all connected clients except the sender
    const broadcast = (message, sender) => {
        clients.forEach((client) => {
            if (client !== sender && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
    return { broadcast };
};
exports.createWebSocketManager = createWebSocketManager;
