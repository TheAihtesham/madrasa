import express from "express";
import {
  createNotice,
  getNotices,
  deleteNotice,
} from "../controllers/noticeController.js";
import uploadNoticeFile from "../middleware/uploadNoticeFile.js";

const router = express.Router();

router.post("/", uploadNoticeFile.single("pdf"), createNotice);
router.get("/", getNotices);
router.delete("/:id", deleteNotice);

export default router;
