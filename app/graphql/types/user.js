const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
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
