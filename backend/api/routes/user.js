const express = require('express');
const router = express.Router();
const Auth = require('../middleware/check-auth');
const multer = require('multer');

const userController = require('../controllers/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {

    //if(file.mimetype.startWith('image')){}
    if ((file.mimetype == 'image/jpeg') || (file.mimetype == 'image/png') || (file.mimetype == 'image/webp')) {
      cb(null, true);
    } else {
      console.log('Only Image ');
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: process.env.MAX_FILE_UPLOAD
    },
    fileFilter
  });

router.post('/create', upload.single('profile'), userController.createUser);
router.post('/login', userController.loginUserAndAdmin);
router.get('/allusers', Auth.adminAuth, userController.getAllUsers);
router.put('/updateblock/:id', Auth.adminAuth, userController.updateBlock);
router.put('/updateonlinestatus/:id', userController.updateOnlineStatus);
router.get('/activeusers', userController.getActiveUsers);

module.exports = router;
