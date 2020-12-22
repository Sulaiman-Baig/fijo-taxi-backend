var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');  

const sequelize = require('./database/database');

// CUSTOM ROUTERS
var indexRouter = require('./routes/index');
var bookingRouter = require('./routes/booking');
var adminRouter = require('./routes/admin');
var chatRouter = require('./routes/message');
var contactUsRouter = require('./routes/contact_us');
var driverRouter = require('./routes/driver');
var favoriteDriverRouter = require('./routes/favorite_drivers');
var passengerRouter = require('./routes/passenger');
var passengerPrefrenceRouter = require('./routes/passenger_prefrences');
var passengerPaymentRouter = require('./routes/passenger_payment_method');
var savedLocationRouter = require('./routes/saved_location');
var vehicleRouter = require('./routes/vehicle');




var app = express();
app.use(cors());

// view engine setup

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});


// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/booking', bookingRouter);
app.use('/chat', chatRouter);
app.use('/contact-us', contactUsRouter);
app.use('/driver', driverRouter);
app.use('/favorite-driver', favoriteDriverRouter);
app.use('/passenger', passengerRouter);
app.use('/passenger-prefrence', passengerPrefrenceRouter);
app.use('/passenger-payment', passengerPaymentRouter);
app.use('/saved-location', savedLocationRouter);
app.use('/vehicle', vehicleRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
