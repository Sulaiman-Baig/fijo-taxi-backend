var express = require('express');
var router = express.Router();
const passengerController = require('../controllers/passenger');
const isAuth = require('../middleware/check-auth');


router.post('/signup', passengerController.createPassenger);
router.post('/signin', passengerController.signinPassenger);
router.post('/update/:passengerId', passengerController.updatePassenger);
router.post('/change-passenger-availabiliy-status/:passengerId', passengerController.changePassengerAvailabiliyStatus);
router.get('/get/:passengerId', passengerController.getbyId);
router.get('/getall', passengerController.getAll);
router.post('/update-current-location/:passengerId', passengerController.updateCurrentLocation);
router.post('/find-passenger-by-email', passengerController.findPassengerByEmail);
router.post('/find-passenger-by-phn-no', passengerController.findPassengerByPhoneNumber);
router.post('/update-password/:id' , passengerController.updatePassword);
router.post('/forgot-password' , passengerController.forgotPassword); // this api can be used for email verification as well but you must comment the purpose where u are using it, it is your resposibility






module.exports = router;