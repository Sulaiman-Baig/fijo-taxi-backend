var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');


router.post('/signup', driverController.createDriver);
router.post('/signin', driverController.signinDriver);




module.exports = router;