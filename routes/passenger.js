var express = require('express');
var router = express.Router();
const passengerController = require('../controllers/passenger');
const isAuth = require('../middleware/check-auth');


router.post('/signup', passengerController.createPassenger);
router.post('/signin', passengerController.signinPassenger);
router.post('/update/:passengerId', passengerController.updatePassenger);
router.get('/get/:passengerId', passengerController.getbyId);
router.get('/getall', passengerController.getAll);






module.exports = router;