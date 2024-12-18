"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Import the CORS middleware
const authController_1 = require("./src/controllers/authController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Enable CORS for all origins
app.use((0, cors_1.default)());
// Middleware to parse JSON and URL-encoded data
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.post('/api/auth/register', authController_1.registerUser);
app.post('/api/auth/login', authController_1.loginUser);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Auth service is running on http://localhost:${PORT}`);
});
