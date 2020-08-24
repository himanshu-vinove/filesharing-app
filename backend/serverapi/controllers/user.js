const ErrorResponse = require('../../utils/errorResponse');
const User = require('../models/User');
const File = require("../models/Filedata");
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
    const users = await User.find({ $and : [{_id: { $ne : req.params.id }},{role: 'user'}] });
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
};

exports.shareFile = async (req, res, next) => {
  try {
    const friendEmail = req.body.email;
    const fileID = req.params.id;
    const user = await User.findById(req.userData.id);
   
    // checking if file belongs to user or not
    if (!user.files.includes(fileID)) {
      return next(new ErrorResponse(`File doesn't belongs to you`, 401));
    }

    const userToRecieveFile = await User.findOne({
      email: friendEmail,
    });
    // console.log(`user to Recieve -- ${userToRecieveFile._id}`);
    if (!userToRecieveFile) {
      return next(new ErrorResponse(`Reciever User doesn't Exist`, 401));
    }

    const fileToBeShared = await File.findByIdAndUpdate(
      fileID,
      { sharedto: [userToRecieveFile._id] },
      {
        runValidators: true,
        new: true,
      }
    );

    userToRecieveFile.sharedFile.push(fileToBeShared.fileName);

    await User.findOneAndUpdate({email: req.body.email}, {
      sharedFile: userToRecieveFile.sharedFile,
    });

    const updatedUser = await User.findById(req.userData.id);

    res.status(200).json(updatedUser.sharedFile);
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};

exports.fetchSFile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    res.status(200).json(user.sharedFile);
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};
