"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cvController_1 = require("../controllers/cvController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/", upload.single("image"), cvController_1.uploadCv);
router.post("/update", upload.single("image"), cvController_1.updateCv);
router.post("/get", cvController_1.getCv);
exports.default = router;
