const ErrorResponse = require('../../utils/errorResponse');
const User = require('../models/User');
const nodemailer = require("nodemailer");

// Create Single User
exports.createUser = async (req, res, next) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profile: req.file.path
    }
    const createdUser = await User.create(user);
    const emailToken = createdUser.getSignedJwtToken();
    // console.log(emailToken);
    const url = `http://localhost:3000/confirmation/${emailToken}`;

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      auth: {
        user: "85e4bc49ccb24a",
        pass: "db01923d832292",
      },
    });
    let mail = await transporter.sendMail({
      from: testAccount.user,
      to: req.body.email,
      subject: "Confirm Email",
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    });
    // console.log(mail);
    res.status(201).json({
      msg: "User Created Successfully",
    });
  } catch (err) {
    return next(
      new ErrorResponse(`Duplicate Value Entered ${err.message}`, 400)
    );
  }
};


// login User
exports.loginUserAndAdmin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password; 

    if (!email || !password) {
      return next(new ErrorResponse('Please Provide Email and Password', 400));
    }

    // check for user
    const user = await User.findOne({ email }).select('+password');
    // console.log(user);

    if (!user) return next(new ErrorResponse('Invalid Credentials', 401));

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401));

    const token = user.getSignedJwtToken();

    // console.log(token);
    res.status(200).json({
      msg: 'User logged in',
      token,
      id: user._id,
      role: user.role,
      blockedStatus: user.blockedStatus
    });

  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};

// get All users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return next(new ErrorResponse(`No user`, 404));
    }
    // console.log(users);
    res.status(200).json(users);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
};

// update block state
exports.updateBlock = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.blockedStatus = user.blockedStatus ? 'false' : 'true';
    await User.findByIdAndUpdate(req.params.id, { blockedStatus: user.blockedStatus });
    
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

// update online status
exports.updateOnlineStatus = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.onlineStatus = user.onlineStatus ? 'false' : 'true';
    await User.findByIdAndUpdate(req.params.id, { onlineStatus: user.onlineStatus });
    res.status(200).json(user);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

// get Active Users
exports.getActiveUsers = async(req, res, next) => {
  try {
    const users = await User.find({ onlineStatus: true });
    if (!users) {
      return next(new ErrorResponse(`No user`, 404));
    }
    res.status(200).json(users);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

