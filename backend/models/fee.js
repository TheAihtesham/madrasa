import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Student",
        required: true
    },
    month: {
        type: String,
        required: true
    }, 
    year: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 500
    }, 
    status: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid"
    },
    paidDate: {
        type: Date
    },
}, { timestamps: true });

export default mongoose.model("Fee", feeSchema);
