const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { extractAttendanceForLab } = require('./attendanceUtils');
const  generateAttendanceExcel  = require('./excelUtils'); 
const { body, validationResult } = require('express-validator');


// const Admin = mongoose.model('Admin', adminSchema);
// const Lab = mongoose.model('Lab', labSchema);
// const Student = mongoose.model('Student', studentSchema);
// const Attendance = mongoose.model('Attendance', attendanceSchema);

const Admin = require('./adminSchema')
const Lab = require('./labSchema')
const Student = require('./studentSchema')
const Attendance = require('./attendanceSchema')



const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret';

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://suyashp124:Suyash%401@cluster0.lvjqsky.mongodb.net/');

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register Admin
app.post('/admin/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    admin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    // Save admin to database
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Admin
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create Lab (Admin only)
app.post('/lab/create', authenticateToken, async (req, res) => {
  try {
    const { labName, maxCapacity } = req.body;

    // Check if lab already exists
    const existingLab = await Lab.findOne({ labName });
    if (existingLab) {
      return res.status(400).json({ message: 'Lab already exists' });
    }

    // Create new lab
    const lab = new Lab({
      labName,
      maxCapacity,
      admin: req.user.id // Admin ID from JWT token
    });

    // Save lab to database
    await lab.save();

    res.status(201).json({ message: 'Lab created successfully', lab });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Enroll Student (Admin only)
app.post('/student/enroll', authenticateToken, async (req, res) => {
  try {
    const { registrationNumber, name, semester, branch, labName } = req.body;

    // Check if lab exists
    const lab = await Lab.findOne({ labName });
    if (!lab) {
      return res.status(400).json({ message: 'Lab does not exist' });
    }

    // Create new student
    const student = new Student({
      registrationNumber,
      name,
      semester,
      branch,
      lab: lab._id
    });

    // Save student to database
    await student.save();

    // Add student to lab
    lab.students.push(student._id);
    await lab.save();

    res.status(201).json({ message: 'Student enrolled successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/student/addToLab', authenticateToken, async (req, res) => {
  try {
    const { registrationNumber, labName } = req.body;

    // Find student by registration number
    const student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Find lab by name
    const lab = await Lab.findOne({ labName });
    if (!lab) {
      return res.status(400).json({ message: 'Lab does not exist' });
    }

    // Check if student is already enrolled in the lab
    if (student.lab.equals(lab._id)) {
      return res.status(400).json({ message: 'Student is already enrolled in the lab' });
    }

    // Add student to lab
    lab.students.push(student._id);
    await lab.save();

    res.status(200).json({ message: 'Student added to lab successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Global variable to store the generated code
let generatedCode = null;

// Route to generate a random 6-digit code (Admin only)
app.get('/lab/generateCode', authenticateToken, async (req, res) => {
  try {
    // Get lab managed by admin
    const lab = await Lab.findOne({ admin: req.user.id });
    if (!lab) {
      return res.status(400).json({ message: 'Admin does not manage any lab' });
    }

    // Generate random 6-digit code
    generatedCode = Math.floor(100000 + Math.random() * 900000);

    res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to mark attendance (Student only)
app.post('/student/markAttendance', async (req, res) => {
  try {
    const { registrationNumber, code } = req.body;

    // Check if the provided code matches the generated code
    if (code !== generatedCode) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Find student by registration number
    const student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Mark attendance
    const attendance = new Attendance({
      student: student._id,
      date: new Date(),
      present: true // Assuming attendance is marked as present if correct code is entered
    });

    await attendance.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to extract attendance data for a lab for a specific year and month
app.get('/attendance',authenticateToken, async (req, res) => {
  try {
    const { labName, year, month } = req.body;

    // Check if all required parameters are provided
    if (!labName || !year || !month) {
      return res.status(400).json({ message: 'Lab name, year, and month are required' });
    }

    // Call the extractAttendanceForLab function
    const attendanceData = await extractAttendanceForLab(labName, parseInt(year), parseInt(month));

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch attendance data' });
  }
});

app.get('/attendance/excel', authenticateToken, async (req, res) => {
  try {
    // Example attendance data (replace with your actual attendance data retrieval logic)
    const attendanceData = [
      { student: { name: 'John', registrationNumber: '123' }, attendance: [{ date: new Date('2024-04-01'), present: true }, { date: new Date('2024-04-02'), present: false }] },
      // Add more attendance data as needed
    ];

    // Generate a unique file name for the Excel file
    const fileName = `attendance_${Date.now()}.xlsx`;
    const filePath = `./${fileName}`;

    // Generate the Excel file
    generateAttendanceExcel(attendanceData, filePath);

    // Send the Excel file as a downloadable attachment
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }

      // Delete the file after it has been sent
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
        console.log('File deleted:', filePath);
      });
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).send('Error generating Excel file');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
