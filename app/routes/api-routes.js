const express = require('express');
const app = express();
const usersRouter = require('./users-router');
const authRouter = require('./auth-router');

app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
