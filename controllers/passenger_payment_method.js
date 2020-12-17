const http_status_codes = require('http-status-codes');
const {
   
    PassengerPaymentMethod
} = require('../database/database');
module.exports = {

    async createPassengerPaymentMethod(req, res, next) {
        try {
            const {
                number,
                expMonth,
                expYear,
                cvc
            } = req.body;    

            passengerId = req.params.passengerId; 

            const passengerPaymentMethod = await PassengerPaymentMethod.create({
                number: number,
                expMonth: expMonth,
                expYear: expYear,
                cvc: cvc,
                passengerId: passengerId
            });
            return res.status(http_status_codes.CREATED).json(passengerPaymentMethod);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating PassengerPaymentMethod"
            });
        }
    },

    async updatePassengerPaymentMethod(req, res, next) {
        try {
            const {
                number,
                expMonth,
                expYear,
                cvc
            } = req.body;

            passengerPaymentMethodId = req.params.passengerPaymentMethodId;

            const passengerPaymentMethod = await PassengerPaymentMethod.update({
                number: number,
                expMonth: expMonth,
                expYear: expYear,
                cvc: cvc               
            }, {
                where: {
                    id: passengerPaymentMethodId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'PassengerPaymentMethod Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating PassengerPaymentMethod"
            });
        }
    },

    async getPassengerPaymentMethod(req, res, next) {
        try {
            passengerPaymentMethodId = req.params.passengerPaymentMethodId;
            const passengerPaymentMethod = await PassengerPaymentMethod.findOne({where: {id: passengerPaymentMethodId }});
            return res.status(http_status_codes.OK).json(passengerPaymentMethod);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching PassengerPaymentMethod"
            });
        }
    },

    async getAllPassengerPaymentMethods(req, res, next) {
        try {            
            const passengerPaymentMethod = await PassengerPaymentMethod.findAll();
            return res.status(http_status_codes.OK).json(passengerPaymentMethod);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All PassengerPaymentMethod"
            });
        }
    },


    async deletePassengerPaymentMethod(req, res, next) {
        try {    
            passengerPaymentMethodId = req.params.passengerPaymentMethodId;        
            const passengerPaymentMethod = await PassengerPaymentMethod.destroy({where: {id: passengerPaymentMethodId}});
            return res.status(http_status_codes.OK).json({message: 'PassengerPaymentMethod Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting PassengerPaymentMethod"
            });
        }
    }
};