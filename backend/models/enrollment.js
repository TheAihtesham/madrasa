import mongoose from "mongoose";

const enrollmentFormSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    age: Number,
    gender: String,
    contact: String,
    address: String,
    email: String,
    course: String,
    dob: Date,
    nationality: String,
    guardianName: String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("EnrollmentForm", enrollmentFormSchema);
