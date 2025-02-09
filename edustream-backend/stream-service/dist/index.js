"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const sessionRoutes_1 = __importDefault(require("./routes/sessionRoutes"));
const socket_1 = require("./config/socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.STREAM_SERVICE_PORT || 5003;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/session', sessionRoutes_1.default);
(0, socket_1.initializeSocket)(server);
// Start server
server.listen(PORT, () => {
    console.log(`Stream service running on http://localhost:${PORT}`);
});
