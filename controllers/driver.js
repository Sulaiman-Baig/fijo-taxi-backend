const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    Driver
} = require('../database/database');
module.exports = {

    async createDriver(req, res, next) {

        try {


            const { 
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                driverPhoto,
                gender,
                address,
                postalCode,
                city,
                nie_Dnle,
                nie_Dnle_FrontPic,
                nie_Dnle_BackPic,
                nationality,
                bankName,
                accountNumber,
                swiftCode,
            } = req.body;

            Driver.findOne({
                where: {
                    email: email
                }
            }).then(isDriverExist => {
                if (isDriverExist) {
                    res.json({ error: "This Driver already exists" });
                } else {

                    Driver.create({
                        firstName: firstName,
                        lastName: lastName,
                        password: hashedpassword.generate(password),
                        email: email,
                        phoneNumber: phoneNumber,                       
                        driverPhoto: driverPhoto,                   
                        address: address,
                        postalCode: postalCode,
                        city: city,
                        gender: gender,
                        nie_Dnle: nie_Dnle,
                        nie_Dnle_FrontPic: nie_Dnle_FrontPic,
                        nie_Dnle_BackPic: nie_Dnle_BackPic,
                        nationality: nationality,
                        bankName: bankName,
                        accountNumber: accountNumber,
                        swiftCode: swiftCode,
                        isApproved: false
                    });

                    return res.status(http_status_codes.CREATED).json({ error: 'Driver is Created Successfully' });

                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                error: "Error Occurd in Creating Driver"
            });
        }
    },

    signinDriver(req, res, next) {

        try {
            const {
                email,
                password,
            } = req.body;

            Driver.findOne({
                where: {
                    email: req.body.email
                },
            }).then(isDriverExist => {
                if (isDriverExist) {
                    if (isDriverExist.isApproved == true) {
                        const verify_password = hashedpassword.verify(
                            req.body.password, isDriverExist.password
                        );
                        if (verify_password) {
                            const token = jwt.sign({
                                email: req.body.email,
                                driverId: isDriverExist.id
                            },
                                "very-long-string-for-secret", {
                                expiresIn: 3600
                            }
                            );

                            res.json({
                                message: "successfully login",
                                accessToken: token,
                                driver: isDriverExist,
                                expiresIn: '3600'
                            })
                        } else {
                            res.status(http_status_codes.UNAUTHORIZED).json({
                                error: 'invalidcredentials'
                            })
                        }
                    } else if (isDriverExist.isApproved == false) {
                        res.status(http_status_codes.UNAUTHORIZED).json({
                            message: 'Sorry, you are not approved by admin yet.'
                        });
                    }

                } else {
                    res.status(http_status_codes.UNAUTHORIZED).json({
                        error: 'driver does not exist'
                    })
                }
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                error: 'error in signinDriver'
            });
        }
    },

    async approveDriver(req, res, next) {
        try {
            driverId = req.params.driverId;

            Driver.update({
                isApproved: true
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Approved sussessfully",
                approvalStatus: true
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in approveDriver"
            })
        }
    },

    async disApproveDriver(req, res, next) {
        try {
            driverId = req.params.driverId;

            Driver.update({
                isApproved: false
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Disapproved sussessfully",
                approvalStatus: false
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in disApproveDriver"
            })
        }
    },

    async updateDriver(req, res, next) {
        try {
            driverId = req.params.driverId;
            const {
                firstName,
                lastName,
                phoneNumber,               
                driverPhoto,     
                gender,
                address,
                postalCode,
                city,
                nie_Dnle,
                nie_Dnle_FrontPic,
                nie_Dnle_BackPic,
                nationality,
                bankName,
                accountNumber,
                swiftCode,

            } = req.body
            Driver.update({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                driverPhoto: driverPhoto,
                gender: gender,
                address: address,
                postalCode: postalCode,
                city: city,
                gender: gender,
                nie_Dnle: nie_Dnle,
                nie_Dnle_FrontPic: nie_Dnle_FrontPic,
                nie_Dnle_BackPic: nie_Dnle_BackPic,
                nationality: nationality,
                bankName: bankName,
                accountNumber: accountNumber,
                swiftCode: swiftCode,
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in updateDriver"
            })
        }
    },

    async getbyId(req, res, next) {
        try {
            const driver = await Driver.findOne({ where: { id: req.params.driverId } });
            return res.status(http_status_codes.OK).json(driver);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single driver"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const drivers = await Driver.findAll();
            return res.status(http_status_codes.OK).json(drivers);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All drivers"
            });
        }
    },

};