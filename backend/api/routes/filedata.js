const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileController = require("../controllers/ filedata");
const Auth = require("../middleware/check-auth");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadedfiles/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video") ||
    file.mimetype == "application/pdf"
  ) {
    cb(null, true);
  } else {
    console.log("Upload Images, Videos & Pdf only");
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: process.env.MAX_FILE_UPLOAD,
  },
  fileFilter,
});

  router.post("/fileupload", upload.array("files"), Auth.userAuth, fileController.FileUpload);
router.get("/getuploadedfile", Auth.userAuth, fileController.fetchUploadFile);


module.exports = router;
