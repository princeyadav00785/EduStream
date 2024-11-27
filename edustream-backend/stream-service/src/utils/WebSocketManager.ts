import { WebSocketServer, WebSocket } from 'ws';

interface WebSocketManager {
    broadcast: (message: string, sender?: WebSocket) => void;
}

export const createWebSocketManager = (server: any): WebSocketManager => {
    const wss = new WebSocketServer({ server });
    const clients: Set<WebSocket> = new Set();

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
    const broadcast = (message: string, sender?: WebSocket) => {
        clients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    return { broadcast };
};
