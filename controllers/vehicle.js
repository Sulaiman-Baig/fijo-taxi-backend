const http_status_codes = require('http-status-codes');
const {

    Vehicle
} = require('../database/database');
module.exports = {

    async createVehicle(req, res, next) {
        try {
            const driverId = req.params.driverId;
            const {
                brand,
                vehiclePhoto,
                vehicleType,
                noOfSeating,
                vehicleRegNumber,
                vehicleNoPlate,
                noPlatePhoto,
                lisenceNumber,
                lisencePhoto
            } = req.body;
       
            const vehicle = await Vehicle.create({
                brand: brand,
                vehiclePhoto: vehiclePhoto,
                vehicleType: vehicleType,
                noOfSeating: noOfSeating,
                vehicleRegNumber: vehicleRegNumber,
                vehicleNoPlate: vehicleNoPlate,
                noPlatePhoto: noPlatePhoto,
                lisenceNumber: lisenceNumber,
                lisencePhoto: lisencePhoto,
                driverId: driverId
            });
            return res.status(http_status_codes.StatusCodes.CREATED).json(vehicle);
        } catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating createVehicle"
            });
        }
    },

    async updateVehicle(req, res, next) {
        try {
            const {
                brand,
                vehiclePhoto,
                vehicleType,
                noOfSeating,
                vehicleRegNumber,
                vehicleNoPlate,
                noPlatePhoto,
                lisenceNumber,
                lisencePhoto
            } = req.body;

            const vehicleId = req.params.id;

            const vehicle = await Vehicle.update({
                brand: brand,
                vehiclePhoto: vehiclePhoto,
                vehicleType: vehicleType,
                noOfSeating: noOfSeating,
                vehicleRegNumber: vehicleRegNumber,
                vehicleNoPlate: vehicleNoPlate,
                noPlatePhoto: noPlatePhoto,
                lisenceNumber: lisenceNumber,
                lisencePhoto: lisencePhoto

            }, {
                where: {
                    id: vehicleId
                }
            });
            return res.status(http_status_codes.StatusCodes.OK).json({
                message: 'Vehicle Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating updateVehicle"
            });
        }
    },

    async getVehicle(req, res, next) {
        try {
            const vehicleId = req.params.id;
            const vehicle = await Vehicle.findOne({ where: { id: vehicleId } });
            return res.status(http_status_codes.StatusCodes.OK).json(vehicle);
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getVehicle"
            });
        }
    },

    async getVehicleByDriver(req, res, next) {
        try {
            const driverId = req.params.driverId;
            const vehicle = await Vehicle.findOne({ where: { driverId: driverId } });
            return res.status(http_status_codes.StatusCodes.StatusCodes.OK).json({vehicleByDriver: vehicle});
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getVehicleByDriver"
            });
        }
    },

    async getAllVehicles(req, res, next) {
        try {
            const vehicles = await Vehicle.findAll();
            return res.status(http_status_codes.StatusCodes.OK).json(vehicles);
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllVehicles"
            });
        }
    },


    async deleteVehicle(req, res, next) {
        try {
            const vehicleId = req.params.id;
            const vehicle = await Vehicle.destroy({ where: { id: vehicleId } });
            return res.status(http_status_codes.StatusCodes.OK).json({ message: 'Vehicle Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Vehicle"
            });
        }
    }
};