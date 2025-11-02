import Notice from "../models/notice.js";

// Create new notice
export const createNotice = async (req, res) => {
  try {
    const fileUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/notices/${req.file.filename}`
      : null;

    const notice = await Notice.create({
      title: req.body.title,
      description: req.body.description,
      pdf: fileUrl
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete notice
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
