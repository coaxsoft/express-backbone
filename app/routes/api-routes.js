const express = require('express');
const app = express();
const usersRouter = require('./users');
const authRouter = require('./auth');

app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
