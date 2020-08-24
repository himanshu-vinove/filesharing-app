const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const FileUpload = new mongoose.Schema({
  
 uploadedBy:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
 },
  sharedWith: {
    type: [],
    default:[],
  },
  fileName: {
    type: String,
    required: [true, "Please Select a File"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model('File', FileUpload);