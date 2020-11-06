const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    Admin
} = require('../database/database');
module.exports = {

    async createAdmin(req, res, next) {

        try {
            const {
                adminname,
                email,
                password
            } = req.body;

            Admin.findOne({
                where: {
                    email: email
                }
            }).then(isAdminExist => {
                if (isAdminExist) {
                    res.json({ error: "This Admin already exists" });
                } else {

                    Admin.create({
                        adminName: adminname,
                        password: hashedpassword.generate(password),
                        email: email
                    });

                    return res.status(http_status_codes.CREATED).json({ error: 'Admin is Created Successfully' });

                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                error: "Error Occurd in Creating createAdmin"
            });
        }
    },

    signinAdmin(req, res, next) {

        try {
            const {
                email,
                password,
            } = req.body;

            Admin.findOne({
                where: {
                    email: req.body.email
                },
            }).then(isAdminExist => {
                if (isAdminExist) {
                    const verify_password = hashedpassword.verify(
                        req.body.password, isAdminExist.password
                    );
                    if (verify_password) {
                        const token = jwt.sign({
                            email: req.body.email,
                            adminId: isAdminExist.id
                        },
                            "very-long-string-for-secret", {
                            expiresIn: 3600
                        }
                        );

                        res.json({
                            message: "successfully login",
                            accessToken: token,
                            admin: isAdminExist,
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
                error: 'error in signinAdmin'
            });
        }
    },

};