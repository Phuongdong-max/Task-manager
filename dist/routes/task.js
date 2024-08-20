"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const excelController_1 = require("../controllers/excelController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(["manager"]), taskController_1.createTask);
router.put("/:id", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(["manager", "employee"]), taskController_1.updateTask);
router.delete("/:id", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(["manager"]), taskController_1.deleteTask);
router.get("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(["manager", "employee"]), taskController_1.getTasks);
router.get("/export-excel", excelController_1.exportTaskstoExcel);
const upload = (0, multer_1.default)();
router.post("/import-excel", upload.single("file"), excelController_1.importTasksFromExcel);
exports.default = router;