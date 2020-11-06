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
                licenseNumber,
                vehicleRegistrationCertificateNumber,
                vehicleNumberPlate,
                vehiclePhoto,
                brandOfCar,
                typeOfCar,
                numberOfSeating,
                driverPhoto,
                bankDetailsOfDriver,
                phoneNumber,
                addressWithCityAndPostcode,
                gender
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
                        licenseNumber: licenseNumber,
                        vehicleRegistrationCertificateNumber: vehicleRegistrationCertificateNumber,
                        vehicleNumberPlate: vehicleNumberPlate,
                        vehiclePhoto: vehiclePhoto,
                        brandOfCar: brandOfCar,
                        typeOfCar: typeOfCar,
                        numberOfSeating: numberOfSeating,
                        driverPhoto: driverPhoto,
                        bankDetailsOfDriver: bankDetailsOfDriver,
                        phoneNumber: phoneNumber,
                        addressWithCityAndPostcode: addressWithCityAndPostcode,
                        gender: gender,
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
                } else {
                    res.status(http_status_codes.UNAUTHORIZED).json({
                        error: 'invalidcredentials'
                    })
                }
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                error: 'error in signinDriver'
            });
        }
    },

};