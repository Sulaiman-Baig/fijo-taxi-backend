var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/check-auth');


router.post('/signup', adminController.createAdmin);
router.post('/signin', adminController.signinAdmin);




module.exports = router;