"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionControllers_1 = require("../controllers/sessionControllers");
const router = (0, express_1.Router)();
router.post('/', sessionControllers_1.createSession);
router.delete('/:sessionId', sessionControllers_1.endSession);
exports.default = router;
