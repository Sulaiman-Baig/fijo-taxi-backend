const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    Passenger
} = require('../database/database');
module.exports = {

    async createPassenger(req, res, next) {

        try {
            const {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                addressWithCityAndPostcode,
                gender,
                profilePhoto
            } = req.body;

            Passenger.findOne({
                where: {
                    email: email
                }
            }).then(isPassengerExist => {
                if (isPassengerExist) {
                    res.json({ error: "This Passenger already exists" });
                } else {

                    Passenger.create({
                        firstName: firstName,
                        lastName: lastName,
                        password: hashedpassword.generate(password),
                        email: email,
                        phoneNumber: phoneNumber,
                        addressWithCityAndPostcode: addressWithCityAndPostcode,
                        gender: gender,
                        profilePhoto: profilePhoto
                    });

                    return res.status(http_status_codes.CREATED).json({ error: 'Passenger is Created Successfully' });

                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                error: "Error Occurd in Creating createPassenger"
            });
        }
    },

    signinPassenger(req, res, next) {

        try {
            const {
                email,
                password,
            } = req.body;

            Passenger.findOne({
                where: {
                    email: req.body.email
                },
            }).then(isPassengerExist => {
                if (isPassengerExist) {
                    const verify_password = hashedpassword.verify(
                        req.body.password, isPassengerExist.password
                    );
                    if (verify_password) {
                        const token = jwt.sign({
                            email: req.body.email,
                            pessengerId: isPassengerExist.id
                        },
                            "very-long-string-for-secret", {
                            expiresIn: 3600
                        }
                        );

                        res.json({
                            message: "successfully login",
                            accessToken: token,
                            pessenger: isPassengerExist,
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
                error: 'error in signinPassenger'
            });
        }
    },

};