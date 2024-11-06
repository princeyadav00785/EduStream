import express from 'express';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import streamRoutes from './routes/streamRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use('/api/stream', streamRoutes);

// Create WebSocket server
const wss = new WebSocketServer({ noServer: true });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Integrate WebSocket with Express
const server = app.listen(PORT, () => {
    console.log(`Stream service is running on http://localhost:${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
