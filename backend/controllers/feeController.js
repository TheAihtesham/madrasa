import Fee from "../models/fee.js";

// Mark as paid
export const markFeePaid = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findByIdAndUpdate(
      id,
      { status: "Paid", paidDate: new Date() },
      { new: true }
    );

    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fees
export const getFees = async (req, res) => {
  const fees = await Fee.find()
    .populate("studentId", "name contact")
    .sort({ createdAt: -1 });

  res.json(fees);
};

// Check and Uncheck
export const toggleFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id);
    if (!fee) return res.status(404).json({ message: "Fee record not found" });

    fee.status = fee.status === "Paid" ? "Unpaid" : "Paid";
    fee.paidDate = fee.status === "Paid" ? new Date() : null;

    await fee.save();

    res.json({ success: true, message: "Status updated", fee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

