import { Router } from "express";
import { getCv, uploadCv, updateCv } from "../controllers/cvController";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), uploadCv);
router.post("/update", upload.single("image"), updateCv);
router.post("/get", getCv);

export default router;
