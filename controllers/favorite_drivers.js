const http_status_codes = require('http-status-codes');
const {

    FavoriteDriver
} = require('../database/database');
module.exports = {

    async createFavoriteDriver(req, res, next) {
        try {
            const {
                driverId,
                passengerId
            } = req.body;
            const isFavoriteDriverExist = await FavoriteDriver.findOne({ where: { passengerId: passengerId } });

            if (isFavoriteDriverExist) {
                const driver = await FavoriteDriver.update({
                    driverId: driverId,
                    passengerId: passengerId
                }, {
                    where: {
                        id: isFavoriteDriverExist.id
                    }
                });
                return res.status(http_status_codes.CREATED).json({ message: 'FavoriteDriver is updated successfully because it exists already' });
            } else {
                const favoriteDriver = await FavoriteDriver.create({
                    driverId: driverId,
                    passengerId: passengerId
                });
                return res.status(http_status_codes.CREATED).json(favoriteDriver);
            }          
            
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating createFavoriteDriver"
            });
        }
    },

    async updateFavoriteDriver(req, res, next) {
        try {
            const {
                driverId,
                passengerId
            } = req.body;

            favoriteDriverId = req.params.id;
            const favoriteDriver = await FavoriteDriver.update({
                driverId: driverId,
                passengerId: passengerId

            }, {
                where: {
                    id: favoriteDriverId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'FavoriteDriver Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating FavoriteDriver"
            });
        }
    },

    async getFavoriteDriver(req, res, next) {
        try {
            favoriteDriverId = req.params.id;
            const favoriteDriver = await FavoriteDriver.findOne({ where: { id: favoriteDriverId } });
            return res.status(http_status_codes.OK).json(favoriteDriver);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching FavoriteDriver"
            });
        }
    },

    async getAllFavoriteDrivers(req, res, next) {
        try {
            passengerId = req.params.id;
            const favoriteDriver = await FavoriteDriver.findAll({ where: { passengerId: passengerId } });
            return res.status(http_status_codes.OK).json(favoriteDriver);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All FavoriteDriver"
            });
        }
    },


    async deleteFavoriteDriver(req, res, next) {
        try {
            favoriteDriverId = req.params.id;
            const favoriteDriver = await FavoriteDriver.destroy({ where: { id: favoriteDriverId } });
            return res.status(http_status_codes.OK).json({ message: 'FavoriteDriver Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting FavoriteDriver"
            });
        }
    }
};