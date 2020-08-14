const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const usersQuery = require('./queries/users');
const loginMutation = require('./mutations/login');
const registrationMutation = require('./mutations/registration');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: usersQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      login: loginMutation,
      registration: registrationMutation
    },
  })
});

module.exports = schema;
