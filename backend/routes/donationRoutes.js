import express from "express";
import {
  createDonationLink,
  confirmDonation,
  getDonations,
  addDonation,
} from "../controllers/donationController.js";

const router = express.Router();


router.post("/create-link", createDonationLink);
router.post("/add-donation", addDonation);
router.put("/confirm/:id", confirmDonation);
router.get("/", getDonations);

export default router;
