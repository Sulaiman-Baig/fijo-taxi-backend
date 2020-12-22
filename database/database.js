const Sequelize = require('sequelize');

// MODELS


const AdminModel = require("../models/admin");
const BookingModel = require("../models/booking");
const ChatModel = require("../models/chat");
const ContactUsModel = require("../models/contact_us");
const ConversationModel = require("../models/conversation");
const DiscountCodeModel = require("../models/discount_code");
const FavoriteDriverModel = require("../models/favorite_drivers");
const DriverModel = require("../models/driver");
const MessageModel = require("../models/message");
const PassengerModel = require("../models/passenger");
const PassengerPaymentMethodModel = require("../models/passenger_payment_method");
const PassengerPreferenceModel = require("../models/passenger_prefrences");
const SavedLocationModel = require("../models/saved_location");
const VehicleModel = require("../models/vehicle");
const WithdrawModel = require("../models/withdraw");


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
const Booking = BookingModel(sequelize, Sequelize);
const Chat = ChatModel(sequelize, Sequelize);
const ContactUs = ContactUsModel(sequelize, Sequelize);
const Conversation = ConversationModel(sequelize, Sequelize);
const DiscountCode = DiscountCodeModel(sequelize, Sequelize);
const Driver = DriverModel(sequelize, Sequelize);
const FavoriteDriver = FavoriteDriverModel(sequelize, Sequelize);
const Passenger = PassengerModel(sequelize, Sequelize);
const PassengerPaymentMethod = PassengerPaymentMethodModel(sequelize, Sequelize);
const PassengerPreference = PassengerPreferenceModel(sequelize, Sequelize);
const SavedLocation = SavedLocationModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize);
const Vehicle = VehicleModel(sequelize, Sequelize);
const Withdraw = WithdrawModel(sequelize, Sequelize);





//  RELATIONS

Withdraw.belongsTo(Driver);
Driver.hasMany(Withdraw);

Booking.belongsTo(Driver);
Driver.hasMany(Booking);

FavoriteDriver.belongsTo(Driver);
Driver.hasMany(FavoriteDriver);

FavoriteDriver.belongsTo(Passenger);
Passenger.hasMany(FavoriteDriver);

Booking.belongsTo(Passenger);
Passenger.hasMany(Booking);

PassengerPaymentMethod.belongsTo(Passenger);
Passenger.hasMany(PassengerPaymentMethod);

PassengerPreference.belongsTo(Passenger);
Passenger.hasMany(PassengerPreference);

Vehicle.belongsTo(Driver);
Driver.hasMany(Vehicle);

SavedLocation.belongsTo(Passenger);
Passenger.hasMany(SavedLocation);

ContactUs.belongsTo(Passenger);
Passenger.hasMany(ContactUs);

ContactUs.belongsTo(Driver);
Driver.hasMany(ContactUs);


Message.belongsTo(Conversation);
Conversation.hasMany(Message, { foreignKey: 'conversationId', sourceKey: 'id' });




//TO UPDATE SCHEMA

// sequelize.sync({ alter: true }).then(() => {
//     console.log(`Database & tables created!`);
// });





// EXPORT MODELS

module.exports = {
    Admin,
    Booking,
    Chat,
    ContactUs,
    Conversation,
    DiscountCode,
    Driver,
    FavoriteDriver,
    Message,
    Passenger,
    PassengerPaymentMethod,
    PassengerPreference,
    SavedLocation,
    Vehicle,
    Withdraw
}; 