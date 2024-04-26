const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    registrationNumber: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    branch: {
      type: String,
      required: true
    },
    lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab',
      required: true
    }
  });

const Student= mongoose.model('Student', studentSchema);

module.exports = Student;