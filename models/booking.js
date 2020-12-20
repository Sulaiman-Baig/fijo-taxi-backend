module.exports = (sequelize, type) => {
    return sequelize.define("booking", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        amount: type.STRING,
        pickup: type.STRING,
        destination: type.STRING,
        status: type.STRING,
        cancellReason: type.STRING,
        totalCost: type.STRING,
        paymentVia: type.STRING,
        screenShot: type.STRING,
        exactPriceForDriver: type.INTEGER,
        exactPriceForPassenger: type.INTEGER,
    });
};
