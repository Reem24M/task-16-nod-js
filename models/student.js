const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    courses: {
    type: [String], 
    default: []
  }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
