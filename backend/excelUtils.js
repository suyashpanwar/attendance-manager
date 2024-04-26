const XLSX = require('xlsx');
const fs = require('fs');

// Function to generate Excel file from attendance data
const generateAttendanceExcel = (attendanceData, filePath) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert attendance data to worksheet
    const wsData = attendanceData.map(({ student, attendance }) => {
      return {
        Name: student.name,
        RegistrationNumber: student.registrationNumber,
        ...attendance.reduce((acc, { date, present }) => {
          acc[date.toISOString().split('T')[0]] = present ? 'Present' : 'Absent';
          return acc;
        }, {})
      };
    });
    const ws = XLSX.utils.json_to_sheet(wsData);
  
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
  
    // Write workbook to file
    XLSX.writeFile(wb, filePath);
  
    console.log(`Attendance Excel file saved to ${filePath}`);
  };
  
  // Export the generateAttendanceExcel function
  module.exports = generateAttendanceExcel;
