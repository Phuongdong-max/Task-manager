import { Router } from "express";
import { ggAuth } from "../controllers/googleAuth";

const router = Router();

router.post("/google", ggAuth);

export default router;
