import { Router } from "express";
import {
  getChatted,
  getMessenge,
  sendMessage,
} from "../controllers/messageController";

const router = Router();

router.get("/:userId1/:userId2", getMessenge);
router.get("/:userId", getChatted);
router.post("/send", sendMessage);

export default router;
