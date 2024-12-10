"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4002;
app.use(body_parser_1.default.json());
app.use('/api/notifications', notificationRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Notification Service running on http://localhost:${PORT}`);
});
