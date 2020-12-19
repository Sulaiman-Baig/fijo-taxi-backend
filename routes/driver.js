var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');


router.post('/signup', driverController.createDriver);
router.post('/signin', driverController.signinDriver);
router.get('/approve-driver/:driverId', driverController.approveDriver);
router.get('/dis-approve-driver/:driverId', driverController.disApproveDriver);
router.post('/update/:driverId', driverController.updateDriver);
router.post('/change-driver-availabiliy-status/:driverId', driverController.changeDriverAvailabiliyStatus);
router.post('/create-driver-bank-details/:driverId', driverController.createDriverBankDetails);
router.post('/update-current-location/:driverId', driverController.updateCurrentLocation);
router.get('/get/:driverId', driverController.getbyId);
router.get('/get-availability-status/:driverId', driverController.getAvailabilityStatus);
router.get('/getall', driverController.getAll);
router.post('/update-password/:id' , driverController.updatePassword);
router.post('/forgot-password' , driverController.forgotPassword); // this api can be used for email verification as well but you must comment the purpose where u are using it, it is your resposibility




module.exports = router;