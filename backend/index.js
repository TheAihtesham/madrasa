import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import enrollRoutes from "./routes/enrollRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

import path from "path";
const __dirname = path.resolve()

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/uploads/notices", express.static(path.join(__dirname, "uploads/notices")));

// API routes
app.use("/api/enroll", enrollRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/fees", feeRoutes)
app.use("/api/expenses", expenseRoutes)

app.get("/", (req, res) => res.send(" Madrasa Management System API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
