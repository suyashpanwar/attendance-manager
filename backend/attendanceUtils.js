// attendanceUtils.js

const Lab = require('./labSchema')
const Student = require('./studentSchema')
const Attendance = require('./attendanceSchema')

// Function to extract attendance for a lab for a month
const extractAttendanceForLab = async (labName, year, month) => {
  try {
    // Find the lab by name
    const lab = await Lab.findOne({ labName });
    if (!lab) {
      throw new Error('Lab not found');
    }

    // Find all students enrolled in the lab
    const students = await Student.find({ lab: lab._id });

    const attendanceData = [];

    // Loop through each student to retrieve attendance for the specified month
    for (const student of students) {
      const attendance = await Attendance.find({
        student: student._id,
        date: {
          $gte: new Date(year, month - 1, 1), // Start of the month
          $lt: new Date(year, month, 0) // End of the month
        }
      }).select('date present');

      attendanceData.push({
        student: student.name,
        attendance
      });
    }

    return attendanceData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to extract attendance');
  }
};

module.exports = {
  extractAttendanceForLab
};
