import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    bio: String,
    contact: String,
    email: { type: String, required: true, unique: true },
    course: { type: String, default: "English" },
    yearofExp: Number,
    createdAt: {
        type: Date, default: Date.now
    },
});

export default mongoose.model("Teacher", teacherSchema);
