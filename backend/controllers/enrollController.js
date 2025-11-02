import EnrollmentForm from "../models/enrollment.js"
import Student from "../models/student.js";
import Fee from "../models/fee.js";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Submit new enrollment form
export const submitEnrollment = async (req, res) => {
  try {
    const form = await EnrollmentForm.create(req.body);
    res.status(201).json({ success: true, form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all pending forms 
export const getPendingEnrollments = async (req, res) => {
  try {
    const pendingForms = await EnrollmentForm.find({ status: "pending" });
    res.json(pendingForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve enrollment form
export const approveEnrollment = async (req, res) => {
  try {
    const form = await EnrollmentForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    form.status = "approved";
    await form.save();

    // Create Student
    const student = await Student.create({
      name: form.name,
      age: form.age,
      gender: form.gender,
      contact: form.contact,
      address: form.address,
      email: form.email,
      dob: form.dob,
      course: form.course,
      nationality: form.nationality,
      guardianName: form.guardianName,
      enrollmentId: form._id,
    });

    // Auto-create first fee
    const now = new Date();
    await Fee.create({
      studentId: student._id,
      month: monthNames[now.getMonth()],
      year: now.getFullYear(),
      amount: 500,
      status: "Unpaid",
    });

    res.json({ success: true, message: "Enrollment approved & student + fee created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Reject enrollment form
export const rejectEnrollment = async (req, res) => {
  try {
    const form = await EnrollmentForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    form.status = "rejected";
    await form.save();

    res.json({ success: true, message: "Enrollment rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


