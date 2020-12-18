module.exports = (sequelize, type) => {
    return sequelize.define("passenger_preference", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        openDoor: type.STRING,
        airCondition: type.BOOLEAN,
        conversation: type.STRING,
        call: type.STRING
    });
};


