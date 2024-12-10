"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.post('/send', notificationController_1.sendNotification);
router.get('/:userId', notificationController_1.getNotifications);
exports.default = router;
