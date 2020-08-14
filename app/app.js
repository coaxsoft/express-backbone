const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const authMiddleware = require('./middlewares/jwt');

const app = express();

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql', authMiddleware, graphqlHTTP((req) => {
  return {
    schema: schema,
    graphiql: true,
    context: { user: req.user }
  }
}));

app.use(function(req, res, next) {
  next({ status: 404, message: 'Not Found' });
});

app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
