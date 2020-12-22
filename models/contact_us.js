module.exports = (sequelize, type) => {
    return sequelize.define("contact_us", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },      
      subject: type.STRING,
      message: type.STRING
    });
  };

