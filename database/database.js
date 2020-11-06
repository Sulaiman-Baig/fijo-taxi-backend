const Sequelize = require('sequelize');

// MODELS


const AdminModel = require("../models/admin");
const DriverModel = require("../models/driver");
const PassengerModel = require("../models/passenger");


// SEQUELIZE CONNECTION

const sequelize = new Sequelize("fijotaxiapp", "root", "root1234", {

    host: "localhost",
    dialect: "mysql",
    // operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// MODELS CREATIONS WITH SWQUELIZE

const Admin = AdminModel(sequelize, Sequelize);
const Driver = DriverModel(sequelize, Sequelize);
const Passenger = PassengerModel(sequelize, Sequelize);





//  RELATIONS

// Court.belongsTo(Gym);
// Gym.hasMany(Court);




//TO UPDATE SCHEMA

// sequelize.sync({ alter: true }).then(() => {
//     console.log(`Database & tables created!`);
// });





// EXPORT MODELS

module.exports = {
    Admin,
    Driver,
    Passenger
}; 