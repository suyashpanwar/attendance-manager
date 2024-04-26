const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    labName: {
      type: String,
      required: true,
      unique: true
    },
    maxCapacity: {
      type: Number,
      required: true
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }]
  });
  

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;