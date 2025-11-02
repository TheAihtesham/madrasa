import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: "EnrollmentForm" },
    teacherId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    name: { type: String, required: true},
    age: Number,
    gender: String,
    contact: String,
    address: String,
    email: { type: String, required: true, unique: true },
    dob: Date,
    nationality: String,
    guardianName: String,
    admissionDate: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
