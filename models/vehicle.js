module.exports = (sequelize, type) => {
    return sequelize.define("vehicle", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        typeOfCar: type.STRING,
        licenseNumber: type.STRING,
        licenseNumberPhoto: type.STRING,
        vehicleNumber: type.STRING,
        vehicleNumberPhoto: type.STRING,
        modalNumber: type.STRING,
        brandOfCar: type.STRING,
        image: type.STRING,
        seats: type.STRING,

    });


};

