var express = require('express');
var router = express.Router();
const passengerController = require('../controllers/passenger');
const isAuth = require('../middleware/check-auth');


router.post('/signup', passengerController.createPassenger);
router.post('/signin', passengerController.signinPassenger);




module.exports = router;