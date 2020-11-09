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
    });
};

