require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require('path');
const cors = require('cors');

const cron = require('node-cron');
const fetchData  = require('./libs/fetchHousingAds');
const initDbProcess = require('./libs/chargeDataDB');

const mongoConnect = require('./libs/dbConnection');
mongoConnect.connect;

var housingAdsRouter = require('./routes/housingAds.route');

var app = express();

cron.schedule('*/59 * * * *', () => {
  console.log('Updating JSON file...');
  initDataUpdate();
});
const initDataUpdate = async () => {
  console.log('Init process...');
  await fetchData();
  initDbProcess({advertsData:(path.join(__dirname,'/housingAds.json'))});
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});

app.use('/', housingAdsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () =>{
  console.log('Server on port ', process.env.PORT);
}) 

module.exports = app;
