import Student from "../models/student.js";


// Get all students
export const getAllStudents = async (req, res) => {
  try {
     const students = await Student.find().populate("teacherId", "name course");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student details
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const student = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student 
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


