var express = require('express');
var router = express.Router();
const passengerPreferenceController = require('../controllers/passenger_prefrences');


router.post('/create/:passengerId', passengerPreferenceController.createPassengerPreference );
router.post('/update-passengerpreference-opendoor/:passengeId', passengerPreferenceController.updatePassengerPreferenceOpenDoor );
router.post('/update-passengerpreference-aircondition/:passengeId', passengerPreferenceController.updatePassengerPreferenceAirCondition );
router.post('/update-passengerpreference-conversation/:passengeId', passengerPreferenceController.updatePassengerPreferenceConversation );
router.post('/update-passengerpreference-call/:passengeId', passengerPreferenceController.updatePassengerPreferenceCall );
router.get('/get/:passengerPreferenceId', passengerPreferenceController.getPassengerPreference );
router.get('/get-by-passenger/:passengerId', passengerPreferenceController.getPassengerPreferenceByPassenger );
router.get('/getall', passengerPreferenceController.getAllPassengerPreferences );
router.post('/delete/:passengerPreferenceId', passengerPreferenceController.deletePassengerPreference );



module.exports = router;