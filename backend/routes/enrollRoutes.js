import express from "express";
import {
  submitEnrollment,
  getPendingEnrollments,
  approveEnrollment,
  rejectEnrollment,
} from "../controllers/enrollController.js";

const router = express.Router();

router.post("/", submitEnrollment);
router.get("/", getPendingEnrollments);
router.patch("/:id/approve", approveEnrollment);
router.patch("/:id/reject", rejectEnrollment);

export default router;
