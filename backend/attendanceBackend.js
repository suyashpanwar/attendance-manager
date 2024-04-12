const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

// Define mongoose schemas

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Check if the registration number is numerical
        return /^\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid registration number!`
    }
  },
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  lab: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  present: {
    type: Boolean,
    default: false
  }
});
// Define mongoose models
const Admin = mongoose.model('Admin', adminSchema);
const Student = mongoose.model('Student', studentSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
const uri = 'mongodb+srv://suyashp124:Suyash%401@cluster0.lvjqsky.mongodb.net/attendance'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "attendance" });

app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }

  }
  Admin.findOne({ username }).then(callback);
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { registrationNumber, name, branch, lab, section, year } = req.body;

    // Check if the registration number already exists
    const existingStudent = await Student.findOne({ registrationNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Registration number already exists' });
    }

    // Create a new student document
    const newStudent = new Student({
      registrationNumber,
      name,
      branch,
      lab,
      section,
      year
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/generateCode', (req, res) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code
    res.status(200).json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to mark attendance when the correct code and registration number are provided
app.post('/markAttendance', async (req, res) => {
  var generatedCode = 200911194
  try {
    const { registrationNumber, code } = req.body;

    // Check if the provided registration number exists
    const student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res.status(400).json({ message: 'Invalid registration number' });
    }

    // Check if the provided code matches the generated code
    if (code !== generatedCode) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Mark attendance
    const attendance = new Attendance({
      student: student._id,
      regNo : student.registrationNumber,
      present: true // You can customize this based on your requirements
    });
    await attendance.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));