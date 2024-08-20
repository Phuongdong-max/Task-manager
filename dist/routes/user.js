"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(["manager"]), userController_1.getUsers);
exports.default = router;
