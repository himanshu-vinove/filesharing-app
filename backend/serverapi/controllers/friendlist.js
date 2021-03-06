const ErrorResponse = require("../../utils/errorResponse");
const User = require("../models/User");

// Adding to friend List
exports.addToFriendList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.friendList.push(req.params.id);
    await User.findByIdAndUpdate(req.userData.id, {
      friendList: user.friendList,
    });                                                                                                                                                                                                                                                                                                                                                                                             
    res.status(200).json({ msg: "Added to friendlist" });
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};

// Get Friends List
exports.getFriendList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.friendList.map(async (id) => {
      const friend = await User.findById(id);
      user.fListData.push(friend);
      await User.findByIdAndUpdate(req.userData.id, {
        fListData: user.fListData,
      });
    });
    const updatedUser = await User.findById(req.userData.id);
    if (!updatedUser) {
      return next(new ErrorResponse(`No user`, 404));
    }
    updatedUser.friendList = [];
    await User.findByIdAndUpdate(req.userData.id, {
      friendList: updatedUser.friendList,
    });
    res.status(200).json(updatedUser.fListData);
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};


//remove friend from list

exports.removefiend = async (req, res, next) =>{
  try {
    const user = await User.findById(req.userData.id);

    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.fListData.forEach(element => {
      if (element._id === req.params.id) {
        console.log(element._id);
      }  
    });
    res.status(200).json({ msg: "removed from friend list" });
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }
};