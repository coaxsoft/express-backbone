const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Token',
    description: 'token',
    fields: () => ({
        token: {
            type: GraphQLString,
            description: 'string',
        },
    }),
});
