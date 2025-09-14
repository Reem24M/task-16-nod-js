const Student = require("../models/student")

const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
    if (!students || students.length === 0) {
      return res.status(200).send("There are no students here")
    }
    return res.status(200).json(students)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const GetStudentById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send("ID is required")

    const student = await Student.findById(id)
    if (!student) return res.status(404).send("Student not found")

    return res.status(200).json(student)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const EditStudent = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send("ID is required")

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatedStudent) return res.status(404).send("Student not found")

    return res.status(200).json({ message: "Student updated successfully!", updatedStudent })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const DeleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send("ID is required")

    const student = await Student.findById(id)
    if (!student) return res.status(404).send("Student not found")

    await Student.findByIdAndDelete(id)

    return res.status(200).json({ message: "Student deleted successfully!" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const AddStudent = async (req, res) => {
  try {
    const { username, email, courses } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Username and Email are required" });
    }

    const newStudent = new Student({
      username,
      email,
      courses: courses || []
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student added successfully!",
      student: newStudent
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  GetAllStudents,
  GetStudentById,
  EditStudent,
  DeleteStudent,
  AddStudent
}
