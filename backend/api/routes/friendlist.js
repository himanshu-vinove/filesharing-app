const express = require('express');
const router = express.Router();
const Auth = require('../middleware/check-auth');
const friendController = require('../controllers/friendlist');

router.put('/addtofriendlist/:id', Auth.userAuth, friendController.addToFriendList);
router.get('/getfriendlist', Auth.userAuth, friendController.getFriendList);
router.delete('/removefriend', friendController.removefiend);

module.exports = router;
