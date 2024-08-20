"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const models_1 = require("../models");
const createTask = async (req, res) => {
    const { title, description, status, userId } = req.body;
    try {
        const task = await models_1.Task.create({ title, description, status, userId });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const task = await models_1.Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await models_1.Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.destroy();
        res.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteTask = deleteTask;
const getTasks = async (req, res) => {
    try {
        const tasks = await models_1.Task.findAll({
            include: [
                {
                    model: models_1.User,
                    as: "assignee",
                    attributes: ["username"],
                },
            ],
        });
        res.json(tasks);
    }
    catch (error) {
        console.log();
        console.error(error, req, res);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
exports.getTasks = getTasks;
