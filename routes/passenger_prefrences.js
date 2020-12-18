var express = require('express');
var router = express.Router();
const passengerPreferenceController = require('../controllers/passenger_prefrences');


router.post('/create/:passengerId', passengerPreferenceController.createPassengerPreference );
router.post('/update-passengerpreference-opendoor/:passengerPreferenceId', passengerPreferenceController.updatePassengerPreferenceOpenDoor );
router.post('/update-passengerpreference-aircondition/:passengerPreferenceId', passengerPreferenceController.updatePassengerPreferenceAirCondition );
router.post('/update-passengerpreference-conversation/:passengerPreferenceId', passengerPreferenceController.updatePassengerPreferenceConversation );
router.post('/update-passengerpreference-call/:passengerPreferenceId', passengerPreferenceController.updatePassengerPreferenceCall );
router.get('/get/:passengerPreferenceId', passengerPreferenceController.getPassengerPreference );
router.get('/getall', passengerPreferenceController.getAllPassengerPreferences );
router.post('/delete/:passengerPreferenceId', passengerPreferenceController.deletePassengerPreference );



module.exports = router;