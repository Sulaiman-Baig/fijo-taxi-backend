module.exports = (sequelize, type) => {
    return sequelize.define("driver", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },      
      firstName: type.STRING,
      lastName: type.STRING,
      email: type.STRING,
      password: type.STRING,     
      licenseNumber: type.STRING,     
      vehicleRegistrationCertificateNumber: type.STRING,     
      vehicleNumberPlate: type.STRING,     
      vehiclePhoto: type.STRING,     
      brandOfCar: type.STRING,     
      typeOfCar: type.STRING,     
      numberOfSeating: type.STRING,     
      driverPhoto: type.STRING,     
      bankDetailsOfDriver: type.STRING,     
      phoneNumber: type.STRING,     
      addressWithCityAndPostcode: type.STRING,     
      gender: type.STRING,    
      isApproved: {
        type: type.BOOLEAN,
        defaultValue: false
    },   
    });
  };

