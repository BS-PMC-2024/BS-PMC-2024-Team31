// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
