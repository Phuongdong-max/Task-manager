import { Request, Response } from "express";
import { Task, User } from "../models";
import * as xlsx from "xlsx";

export const exportTaskstoExcel = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      include: [{ association: "assignee" }],
    });

    const tasksData = tasks.map((task: any) => ({
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
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Failed to export tasks to EXCEL", error);
    res.status(500).send("Failed to export to EXCEL");
  }
};

export const importTasksFromExcel = async (req: Request, res: Response) => {
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

    for (const taskData of tasksData as any) {
      const { id, title, description, status, assignee } = taskData;

      const user = await User.findOne({ where: { username: assignee } });
      if (!user) {
        console.error(`User not found for assignee: ${assignee}`);
        continue;
      }

      const userId = user.id;

      await Task.create({
        title,
        description,
        status,
        userId,
      });
    }
    res.status(200).json({ message: "Tasks imported successfully" });
  } catch (error) {
    console.error("Failed to import tasks from Excel", error);
    res.status(500).json({ message: "Failed to import tasks from Excel" });
  }
};
