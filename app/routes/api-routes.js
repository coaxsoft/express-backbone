const express = require('express');
const app = express();
const usersRouter = require('./users-router');
const authRouter = require('./auth-router');
const invitesRouter = require('./invites-router');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/invites', invitesRouter);

module.exports = app;
