const express = require('express');
const app = express();
const usersRouter = require('./usersRouter');
const authRouter = require('./authRouter');
const invitesRouter = require('./invitesRouter');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/invites', invitesRouter);

module.exports = app;
