import { Request, Response } from "express";
import { User, Task } from "../models";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {
    const task = await Task.create({ title, description, status, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["username"],
        },
      ],
    });
    res.json(tasks);
  } catch (error) {
    console.log();
    console.error(error, req, res);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
