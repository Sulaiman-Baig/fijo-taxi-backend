const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const sequelize = require("sequelize");
const op = sequelize.Op;
const nodemailer = require("nodemailer");
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
                gender,
                profilePhoto,
                address,
                postalCode,
                city
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
                        gender: gender,
                        profilePhoto: profilePhoto,
                        address: address,
                        postalCode: postalCode,
                        city: city
                    })
                        .then((passenger) => {
                            return res.status(http_status_codes.CREATED).json(
                                {
                                    message: 'Passenger is Created Successfully',
                                    passenger: passenger
                                }
                            );
                        });
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

    async updatePassenger(req, res, next) {
        try {
            passengerId = req.params.passengerId;
            const {
                firstName,
                lastName,
                phoneNumber,
                addressWithCityAndPostcode,
                gender,
                profilePhoto,
                address,
                postalCode,
                city,
            } = req.body
            Passenger.update({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                gender: gender,
                profilePhoto: profilePhoto,
                address: address,
                postalCode: postalCode,
                city: city
            }, {
                where: {
                    id: passengerId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in updatePassenger"
            })
        }
    },

    async findPassengerByEmail(req, res, next) {
        try {
            const {
                email
            } = req.body;

            const passenger = await Passenger.findOne({
                where: { email: email }
            });
            if (passenger) {
                return res.status(http_status_codes.OK).json({ passenger: passenger, isPassengerExist: true });
            } else {
                return res.status(http_status_codes.OK).json({ passenger: null, isPassengerExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in finding findPassengerByEmail"
            });
        }
    },

    async findPassengerByPhoneNumber(req, res, next) {
        try {
            const {
                phoneNumber
            } = req.body;

            const passenger = await Passenger.findOne({
                where: { phoneNumber: phoneNumber }
            });
            if (passenger) {
                return res.status(http_status_codes.OK).json({ passenger: passenger, isPassengerExist: true });
            } else {
                return res.status(http_status_codes.OK).json({ passenger: null, isPassengerExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in finding findPassengerByphoneNumber"
            });
        }
    },

    async getbyId(req, res, next) {
        try {
            const passenger = await Passenger.findOne({ where: { id: req.params.passengerId } });
            return res.status(http_status_codes.OK).json(passenger);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single passenger"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const passengers = await Passenger.findAll();
            return res.status(http_status_codes.OK).json(passengers);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Passengers"
            });
        }
    },

    async forgotPassword(req, res, next) {
        const reqData = req.body;
        Passenger.findOne({
            where: { email: reqData.email }
        }).then(isPassenger => {
            if (isPassenger) {
                // send email
                var passengermail = req.body.email;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'fijotaxi@gmail.com',
                        pass: 'fijotaxi2020'
                    }
                });
                var rand = Math.floor(Math.random() * 100);
                var mailOptions = {
                    from: ' ', // sender address
                    to: passengermail, // list of receivers
                    subject: 'Passenger Password Verification Code', // Subject line
                    text: 'Here is a code to setup your password again', // plain text body
                    html: 'Hi Dear Passenger <br>Please verify your email using the link below and get back your password! <b style="font-size:24px;margin-left:30px"> Your code - ' + (isPassenger.id) * rand + '<b>' // html body

                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.json('error occured')
                    } else {
                        res.json({
                            passenger: isPassenger,
                            verificationCode: (isPassenger.id) * rand
                        });
                    }
                });

            } else {
                res.json({ message: "Email does not exit" });
            }
        }).catch(err => {
            console.log(err);
            res.json("Some Error Occured!");
        });
    },

    async updatePassword(req, res, next) {
        try {
            id = req.params.id;
            const {
                password
            } = req.body

            Passenger.update({
                password: hashedpassword.generate(password)
            }, {
                where: {
                    id: id
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "An error updatePassword"
            })
        }
    },

    async updateCurrentLocation(req, res, next) {
        try {
            passengerId = req.params.passengerId;
            const {
                currentLat,
                currentLng,
            } = req.body
            Passenger.update({
                currentLat: currentLat,
                currentLng: currentLng,
            }, {
                where: {
                    id: passengerId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in updateCurrentLocation"
            })
        }
    },

};