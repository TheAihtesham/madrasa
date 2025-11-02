import Donation from "../models/donation.js";

export const createDonationLink = async (req, res) => {
  try {
    const { donorName, amount, email, contact, message } = req.body;

    if (!amount || !donorName) {
      return res.status(400).json({ message: "Name and amount are required" });
    }

    //  Your real UPI ID
    const upiId = "chaudharyaihtesham05@oksbi";

    //  Create UPI link 
    const encodedMsg = encodeURIComponent(`Donation by ${donorName}`);
    const upiLink = `upi://pay?pa=${upiId}&pn=Madrasa&am=${amount}&cu=INR&tn=${encodedMsg}`;

    // Generate QR using a reliable QR service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      upiLink
    )}`;

    //  Send response to frontend
    res.status(200).json({
      success: true,
      upiLink,
      qrUrl,
      donorName,
      amount,
      email,
      contact,
      message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save confirmed donation
export const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      ...req.body,
      status: "Pending",
      date: new Date(),
    });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByIdAndUpdate(
      id,
      { status: "Confirmed" },
      { new: true }
    );
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations 
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
