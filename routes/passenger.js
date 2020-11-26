var express = require('express');
var router = express.Router();
const passengerController = require('../controllers/passenger');
const isAuth = require('../middleware/check-auth');


router.post('/signup', passengerController.createPassenger);
router.post('/signin', passengerController.signinPassenger);
router.post('/update/:passengerId', passengerController.updatePassenger);
router.get('/get/:passengerId', passengerController.getbyId);
router.get('/getall', passengerController.getAll);
router.post('/find-passenger-by-email', passengerController.findPassengerByEmail);
router.post('/find-passenger-by-phn-no', passengerController.findPassengerByPhoneNumber);






module.exports = router;