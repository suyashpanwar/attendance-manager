# Swift Attendance Web Application

## Overview

Swift Attendance is a modern web application designed to streamline and enhance the attendance tracking process within a local lab network. This application aims to provide lab instructors and students with an efficient, secure, and user-friendly solution for marking and managing attendance during lab sessions.

## Features

- **Real-time Attendance Tracking:**
  - Lab instructors can send prompts to all devices within the local lab network in real-time.
  - Students enter their registration number and a prompt code to mark attendance promptly.

- **Security Measures:**
  - Secure user authentication ensures accurate recording of attendance and prevents unauthorized access.
  - Each local device can respond to prompts only once, preventing misuse.

- **Automatic Attendance Logging:**
  - Attendance records are automatically stored in an Excel file, minimizing manual data entry and reducing the likelihood of errors.

- **Future Integration:**
  - Potential future integration with Student Life Cycle Management (SLCM) systems for seamless attendance updates and improved academic management.

## Technologies Used

- **Front-end:**
  - React.js for building a dynamic and responsive user interface.
  - HTML, CSS, and JavaScript for front-end development.

- **Back-end:**
  - Node.js with Express for server-side logic.
  - MongoDB for efficient data storage and retrieval.

- **Real-time Functionality:**
  - WebSockets (Socket.io) for enabling real-time communication between devices.
