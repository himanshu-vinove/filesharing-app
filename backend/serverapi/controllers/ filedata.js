const ErrorResponse = require("../../utils/errorResponse");
const File = require("../models/Filedata");
const User = require("../models/User");

// Upload Files
exports.FileUpload = async (req, res, next) => {
  try {
    const files = req.files;
    // console.log(files);

    if (files.length === 0) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }

    for (i = 0; i < files.length; i++) {
      const createdFile = await File.create({
        fileName: req.files[i].originalname,
        uploadedBy: req.userData.id,
      });

      const user = await User.findById(req.userData.id);
      user.files.push(createdFile._id);
      console.log(user.files);
      await User.findByIdAndUpdate(req.userData.id, {
        files: user.files,
      });
    }
    res.status(201).json({
      msg: "file uploaded Successfully",
      //   files: fileCreated,
    });
  } catch (err) {
    return next(
      new ErrorResponse(`Duplicate Value Entered ${err.message}`, 400)
    );
  }
};

// fetch upload files
exports.fetchUploadFile = async (req, res, next) => {
  try {
      const files = await File.find({ uploadedBy: req.userData.id });
      res.status(200).json(files);
  } catch (err) {
    return next(
      new ErrorResponse(`Duplicate Value Entered ${err.message}`, 400)
    );
  }
};
