const { RequestHeaderFieldsTooLarge } = require('http-errors');
const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;
const {
    Booking,
    Driver,
    Comission
} = require('../database/database');

module.exports = {


    async findDrivers(req, res, next) {
        try {

            const {
                carSizeId,
                city

            } = req.body;
            const drivers = await Driver.findAll({

                where: {
                    [op.and]:
                        [
                            { city: city },
                            { isAvailable: true }
                        ]
                },
                include: [
                    {
                        model: Vehicle,
                        where: { carSizeId: carSizeId }
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(drivers);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in finding drivers"
            });
        }
    },

    async createBooking(req, res, next) {
        try {
            const {
                cost,
                pickup,
                destination,
                driverId,
                passengerId
            } = req.body;

            const booking = await Booking.create({
                cost: cost,
                pickup: pickup,
                destination: destination,
                driverId: driverId,
                passengerId: passengerId
            });

            // if (booking) {
            //     const comissions = await Comission.findAll();
            //     const driver = await Driver.findOne({ where: { id: driverId } });
            //     let balanceToUpdate = driver.balance + (booking.cost * comissions[0].customerComissionRate);
            //     driver.update({
            //         balance: balanceToUpdate
            //     });
            //     return res.status(http_status_codes.CREATED).json({ message: 'Booking Created Successfully' });
            // }

        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Booking"
            });
        }
    },

    async getAllDriverBookings(req, res, next) {
        try {
            const bookings = await Booking.findAll({ where: { driverId: driverId } });
            return res.status(http_status_codes.OK).json(bookings);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllDriverBookings"
            });
        }
    },

    async getAllCustomerBookings(req, res, next) {
        try {
            const bookings = await Booking.findAll({ where: { passengerId: passengerId } });
            return res.status(http_status_codes.OK).json(bookings);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllCustomerBookings"
            });
        }
    },

    async getAllBookings(req, res, next) {
        try {
            const bookings = await Booking.findAll();
            return res.status(http_status_codes.OK).json(bookings);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllBookings"
            });
        }
    },

    async calculateEstimatedPrice(req, res, next) {
        try {
            const {
                km,
                isMorning,
                isWeekend,
                isAirport,
                seatingCapacity
            } = req.body;

            // morning time starts
            if (km < 25) {
                if (isWeekend == false && isMorning == true) {
                    if (seatingCapacity >= 5) {
                        //  morning time & seating capacity >= 25
                        let perKmPrice = (1.09 * km);
                        let estimatedPrice = (perKmPrice + 2.0 + 1.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });

                    } else {
                        // morning time & seating capacity is other than >= 25
                        let perKmPrice = (1.09 * km);
                        let estimatedPrice = (perKmPrice + 2.0);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });
                    }
                }
            }
            else if (km > 25) {
                if (isWeekend == false && isMorning == true) {
                    if (seatingCapacity >= 5) {
                        //  morning time & seating capacity >= 25
                        let perKmPrice = (1.20 * km);
                        let estimatedPrice = (perKmPrice + 2.0 + 1.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });

                    } else {
                        // morning time & seating capacity is other than >= 25
                        let perKmPrice = (1.20 * km);
                        let estimatedPrice = (perKmPrice + 2.0);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });
                    }
                }
            }
            // morning time ends

            // night time starts
            if (km < 25) {
                if (isMorning == false) {
                    if (seatingCapacity >= 5) {
                        //  night time & seating capacity >= 25
                        let perKmPrice = (1.19 * km);
                        let estimatedPrice = (perKmPrice + 2.5 + 2);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });

                    } else {
                        // night time & seating capacity is other than >= 25
                        let perKmPrice = (1.19 * km);
                        let estimatedPrice = (perKmPrice + 2.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });
                    }
                }
            }
            else if (km > 25) {
                if (isMorning == false) {
                    if (seatingCapacity >= 5) {
                        //  night time & seating capacity >= 25
                        let perKmPrice = (1.40 * km);
                        let estimatedPrice = (perKmPrice + 2.5 + 2);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });

                    } else {
                        // night time & seating capacity is other than >= 25
                        let perKmPrice = (1.40 * km);
                        let estimatedPrice = (perKmPrice + 2.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });
                    }
                }
            }
            // night time ends

            // day time + weekend starts
            if (km < 25) {
                if (isWeekend == true && isMorning == true) {
                    if (seatingCapacity >= 5) {
                        //  day time + weekend & seating capacity >= 25
                        let perKmPrice = (1.19 * km);
                        let estimatedPrice = (perKmPrice + 2.0 + 2.0);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });

                    } else {
                        // day time + weekend & seating capacity is other than >= 25
                        let perKmPrice = (1.19 * km);
                        let estimatedPrice = (perKmPrice + 2.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.5 });
                    }
                }
            }
            else if (km > 25) {
                if (isWeekend == true && isMorning == true) {
                    if (seatingCapacity >= 5) {
                        //  day time + weekend & seating capacity >= 25
                        let perKmPrice = (1.40 * km);
                        let estimatedPrice = (perKmPrice + 2.0 + 2.0);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });

                    } else {
                        // day time + weekend & seating capacity is other than >= 25
                        let perKmPrice = (1.40 * 2.5);
                        let estimatedPrice = (perKmPrice + 2.5);
                        const price = Math.ceil(estimatedPrice);
                        res.json({ totalPrice: price, basePrice: 2.0 });
                    }
                }
            }
            // day time + weekend ends

            // short distance & morning time starts
            if (km < 3 && isWeekend == false && isMorning == true) {
                res.json({ totalPrice: 4 });
            }
            // short distance & morning time ends

            // short distance & morning time & weekend starts
            if (km < 3 && isWeekend == true && isMorning == true) {
                res.json({ totalPrice: 6 });
            }
            // short distance & morning time & weekend ends

            // short distance & night time starts
            if (km < 3 && isMorning == true) {
                res.json({ totalPrice: 4 });
            }
            // short distance & night time ends


            const bookings = await Booking.findAll();
            return res.status(http_status_codes.OK).json(bookings);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllBookings"
            });
        }
    },
};