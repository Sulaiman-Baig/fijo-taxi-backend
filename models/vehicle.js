module.exports = (sequelize, type) => {
    return sequelize.define("vehicle", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        brand: type.STRING,
        vehiclePhoto: type.STRING,
        vehicleType: type.STRING,
        noOfSeating: type.STRING,
        vehicleRegNumber: type.STRING,
        vehicleNoPlate: type.STRING,
        noPlatePhoto: type.STRING,
        lisenceNumber: type.STRING,
        lisencePhoto: type.STRING
    });
};

