import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import sessionRoutes from './routes/sessionRoutes';
import { initializeSocket } from './config/socket';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.STREAM_SERVICE_PORT || 5003;

app.use(cors());


// Middleware
app.use(express.json());

// Routes
app.use('/api/session', sessionRoutes);

initializeSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`Stream service running on http://localhost:${PORT}`);
});
