const express = require('express');
const app = express();
const usersRouter = require('./usersRouter');
const authRouter = require('./authRouter');
const invitesRouter = require('./invitesRouter');
const exampleRouter = require('./exampleRouter');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/invites', invitesRouter);
app.use('/example', exampleRouter);

module.exports = app;
