"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleAuth_1 = require("../controllers/googleAuth");
const router = (0, express_1.Router)();
router.post("/google", googleAuth_1.ggAuth);
router.get("/google/callback");
exports.default = router;
