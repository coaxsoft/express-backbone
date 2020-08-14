const { GraphQLList } = require('graphql');
const _ = require('lodash');
const userType = require('../types/user');

const query = {
    type: GraphQLList(userType),
    resolve (root, input, ctx) {
        if (_.isNull(ctx.user) || _.isUndefined(ctx.user)) {
            throw new Error('You are not authorized!')
        }

        return [{
            firstName: 'boss',
            lastName: 'bosssss',
        }];
    },
}

module.exports = query
