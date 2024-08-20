"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importTasksFromExcel = exports.exportTaskstoExcel = void 0;
const models_1 = require("../models");
const xlsx = __importStar(require("xlsx"));
const exportTaskstoExcel = async (req, res) => {
    try {
        const tasks = await models_1.Task.findAll({
            include: [{ association: "assignee" }],
        });
        const tasksData = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assignee: task.assignee ? task.assignee.username : "Unassignee",
        }));
        const ws = xlsx.utils.json_to_sheet(tasksData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Tasks");
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
        res.setHeader("Content-Disposition", 'attachment; filename="tasks.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    }
    catch (error) {
        console.error("Failed to export tasks to EXCEL", error);
        res.status(500).send("Failed to export to EXCEL");
    }
};
exports.exportTaskstoExcel = exportTaskstoExcel;
const importTasksFromExcel = async (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).send({ message: "No file upload" });
        }
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const tasksData = xlsx.utils.sheet_to_json(sheet);
        for (const taskData of tasksData) {
            const { id, title, description, status, assignee } = taskData;
            const user = await models_1.User.findOne({ where: { username: assignee } });
            if (!user) {
                console.error(`User not found for assignee: ${assignee}`);
                continue;
            }
            const userId = user.id;
            await models_1.Task.create({
                title,
                description,
                status,
                userId,
            });
        }
        res.status(200).json({ message: "Tasks imported successfully" });
    }
    catch (error) {
        console.error("Failed to import tasks from Excel", error);
        res.status(500).json({ message: "Failed to import tasks from Excel" });
    }
};
exports.importTasksFromExcel = importTasksFromExcel;
