const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes/apiRoutes');

const app = express();

if (process.env.NODE_ENV !== "test") app.use(logger('dev'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (req, res, next) => {
  res.render("homepage", {})
});

app.use('/api/v1', routes);

app.use(function(req, res, next) {
  next({ status: 404, message: 'Not Found' });
});

app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
