const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Basic user',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The id of the droid.',
    },
    firstName: {
      type: GraphQLString,
      description: 'The name of the droid.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The name of the droid.',
    }
  }),
});

const tokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'token',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'string',
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: GraphQLList(userType),
        // resolve() {
        //     return 'world';
        // },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      login: {
        type: tokenType,
        args: {
          email: { type: GraphQLString }, password: { type: GraphQLString }
        },
        // resolve() {
        //     return 'world';
        // },
      },
    },
  })
});

module.exports = schema;
