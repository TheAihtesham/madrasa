import express from "express";
import {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,

} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;
