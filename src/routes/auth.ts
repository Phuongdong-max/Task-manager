import { Router } from "express";
import { ggAuth } from "../controllers/googleAuth";

const router = Router();

router.post("/google", ggAuth);

router.get("/google/callback");

export default router;
