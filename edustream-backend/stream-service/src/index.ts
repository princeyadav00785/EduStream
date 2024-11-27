import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import streamRoutes from './routes/streamRoutes';
import sessionRoutes from './routes/sessionRoutes';
import { createWebSocketManager } from './utils/WebSocketManager';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.STREAM_SERVICE_PORT || 5003;

// Middleware
app.use(express.json());

// Routes
app.use('/api/stream', streamRoutes);
app.use('/api/session', sessionRoutes);

// Initialize WebSocket Manager
const webSocketManager = createWebSocketManager(server);

// Start server
server.listen(PORT, () => {
    console.log(`Stream service running on http://localhost:${PORT}`);
});

// Example usage of the WebSocketManager's broadcast
app.post('/api/broadcast', (req, res) => {
    const { message } = req.body;
    webSocketManager.broadcast(message);
    res.status(200).json({ message: 'Message broadcasted to all clients' });
});
