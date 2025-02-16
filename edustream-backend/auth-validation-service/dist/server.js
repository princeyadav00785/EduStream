"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5004;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api", authRoutes_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`Auth Validation Service running on port ${PORT}`);
});
