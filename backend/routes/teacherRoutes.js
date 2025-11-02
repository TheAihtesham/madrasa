import express from "express";
import {
  addTeacher,
  getTeachers,
  deleteTeacher,
  updateTeacher
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", addTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
