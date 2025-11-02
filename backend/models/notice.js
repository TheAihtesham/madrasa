import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: String,
    pdf: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date, default: Date.now
    },
});

export default mongoose.model("Notice", noticeSchema);
