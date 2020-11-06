var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');


router.post('/signup', driverController.createDriver);
router.post('/signin', driverController.signinDriver);
router.get('/approve-driver/:driverId', driverController.approveDriver);
router.get('/dis-approve-driver/:driverId', driverController.disApproveDriver);




module.exports = router;