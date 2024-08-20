import { Router } from "express";
import { register, login, getUsers } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticate, authorize(["manager", "employee"]), getUsers);

export default router;
