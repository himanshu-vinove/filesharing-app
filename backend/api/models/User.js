const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  username: {
    type: String,
    require: [true, 'Please Provide Name'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide a valid Emial'],
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-][a-z0-9])?/,
  },
  password: {
    type: String,
    required: [true, 'Pleae Provide Password'],
  },
  profile: {
    type: String,
    required: [true, 'Please your upload profile'],
  },
  friendList: {
    type: [],
    default:[],
  },
  fListData: {
    type: [],
    default:[],
  },

  files: {
    type: [],
    default:[],
  },
  blockedStatus: {
    type: Boolean,
    default: false
  },
  sharedFile: {
    type: [],
    default:[],
  },
  emailConfirmationToken: {
    type: String,
  },
  verifiedUser: {
    type: Boolean,
    default: false,
  },
  onlineStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encryptpassword using bryptjs
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userType: this.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Match User Entered password to hashed password in DB [Login]
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
