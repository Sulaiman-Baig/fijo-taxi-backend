const http_status_codes = require('http-status-codes');
const {

    PassengerPreference
} = require('../database/database');
module.exports = {


    async createPassengerPreference(req, res, next) {
        try {
            passengerId = req.params.passengerId;
            const isPassengerPreferenceExist = await PassengerPreference.findOne({ where: { passengerId: passengerId } });

            const {
                openDoor,
                airCondition,
                conversation,
                call
            } = req.body;

            if (isPassengerPreferenceExist) {
                const passengerPreference = await PassengerPreference.update({
                    openDoor: openDoor,
                    airCondition: airCondition,
                    conversation: conversation,
                    call: call
                }, {
                    where: {
                        id: isPassengerPreferenceExist.id
                    }
                });
                return res.status(http_status_codes.StatusCodes.CREATED).json({ message: 'passengerPreference is updated successfully because it exists already' });
            } else {
                const passengerPreference = await PassengerPreference.create({
                    openDoor: openDoor,
                    airCondition: airCondition,
                    conversation: conversation,
                    call: call
                });
                return res.status(http_status_codes.StatusCodes.CREATED).json({ message: 'passengerPreference is created successfully' });
            }

        } catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating createPassengerPreference"
            });
        }
    },

    async updatePassengerPreferenceOpenDoor(req, res, next) {
        try {
            const {
                openDoor
            } = req.body;
            passengerId = req.params.passengerId;
            const passengerPreference = await PassengerPreference.update({
                openDoor: openDoor
            }, {
                where: {
                    passengerId: passengerId
                }
            });
            return res.status(http_status_codes.StatusCodes.OK).json({
                message: 'updatePassengerPreferenceOpenDoor Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating updatePassengerPreferenceOpenDoor"
            });
        }
    },

    async updatePassengerPreferenceAirCondition(req, res, next) {
        try {
            const {
                airCondition
            } = req.body;
            passengerId = req.params.passengerId;
            const passengerPreference = await PassengerPreference.update({
                airCondition: airCondition
            }, {
                where: {
                    passengerId: passengerId
                }
            });
            return res.status(http_status_codes.StatusCodes.OK).json({
                message: 'updatePassengerPreferenceAirCondition Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating updatePassengerPreferenceAirCondition"
            });
        }
    },

    async updatePassengerPreferenceConversation(req, res, next) {
        try {
            const {
                conversation
            } = req.body;
            passengerId = req.params.passengerId;
            const passengerPreference = await PassengerPreference.update({
                conversation: conversation
            }, {
                where: {
                    passengerId: passengerId
                }
            });
            return res.status(http_status_codes.StatusCodes.OK).json({
                message: 'updatePassengerPreferenceConversation Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating updatePassengerPreferenceConversation"
            });
        }
    },

    async updatePassengerPreferenceCall(req, res, next) {
        try {
            const {
                call
            } = req.body;
            passengerId = req.params.passengerId;
            const passengerPreference = await PassengerPreference.update({
                call: call
            }, {
                where: {
                    passengerId: passengerId
                }
            });
            return res.status(http_status_codes.StatusCodes.OK).json({
                message: 'updatePassengerPreferenceCall Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating updatePassengerPreferenceCall"
            });
        }
    },

    async getPassengerPreference(req, res, next) {
        try {
            passengerPreferenceId = req.params.passengerPreferenceId;
            const passengerPreference = await PassengerPreference.findOne({ where: { id: passengerPreferenceId } });
            return res.status(http_status_codes.StatusCodes.OK).json(passengerPreference);
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getPassengerPreference"
            });
        }
    },

    async getPassengerPreferenceByPassenger(req, res, next) {
        try {
            passengerId = req.params.passengerId;
            const passengerPreference = await PassengerPreference.findOne({ where: { passengerId: passengerId } });
            return res.status(http_status_codes.StatusCodes.OK).json(passengerPreference);
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getPassengerPreferenceByPassenger"
            });
        }
    },

    async getAllPassengerPreferences(req, res, next) {
        try {
            const passengerPreference = await PassengerPreference.findAll();
            return res.status(http_status_codes.StatusCodes.OK).json(passengerPreference);
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllPassengerPreferences"
            });
        }
    },


    async deletePassengerPreference(req, res, next) {
        try {
            passengerPreferenceId = req.params.passengerPreferenceId;
            const passengerPreference = await PassengerPreference.destroy({ where: { id: passengerPreferenceId } });
            return res.status(http_status_codes.StatusCodes.OK).json({ message: 'PassengerPreference Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting deletePassengerPreference"
            });
        }
    }
};