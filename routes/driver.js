var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');


router.post('/signup', driverController.createDriver);
router.post('/signin', driverController.signinDriver);
router.get('/approve-driver/:driverId', driverController.approveDriver);
router.get('/dis-approve-driver/:driverId', driverController.disApproveDriver);
router.post('/update/:driverId', driverController.updateDriver);
router.post('/create-driver-bank-details/:driverId', driverController.createDriverBankDetails);
router.post('/update-current-location/:driverId', driverController.updateCurrentLocation);
router.get('/get/:driverId', driverController.getbyId);
router.get('/getall', driverController.getAll);




module.exports = router;