import { Router } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import {
  exportTaskstoExcel,
  importTasksFromExcel,
} from "../controllers/excelController";
import multer from "multer";
const router = Router();

router.post("/", authenticate, authorize(["manager"]), createTask);
router.put(
  "/:id",
  authenticate,
  authorize(["manager", "employee"]),
  updateTask
);
router.delete("/:id", authenticate, authorize(["manager"]), deleteTask);
router.get("/", authenticate, authorize(["manager", "employee"]), getTasks);

router.get("/export-excel", exportTaskstoExcel);
const upload = multer();
router.post("/import-excel", upload.single("file"), importTasksFromExcel);
export default router;
