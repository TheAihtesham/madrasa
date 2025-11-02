import express from "express";
import { getFees, markFeePaid, toggleFeeStatus } from "../controllers/feeController.js";

const router = express.Router();

router.get("/", getFees);
router.put("/:id/pay", markFeePaid);
router.put("/:id/toggle", toggleFeeStatus);


export default router;
