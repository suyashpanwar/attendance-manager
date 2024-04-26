const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    labs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab'
    }]
  });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;