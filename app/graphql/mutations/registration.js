const { GraphQLString } = require('graphql');
const tokenType = require('../types/token');
const jwt = require('../../utils/jwt');

const { User, Role } = require('../../db/models');

const mutation = {
    type: tokenType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    },
    async resolve (root, input, ctx) {
        const { email, firstName, lastName, password } = input;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error('User with this email already exists');

        const newUser = await User.create({ email, firstName, lastName, password });
        const userRole = await Role.findOne({ where: { roleName: 'User' } });
        await newUser.setRoles(userRole);

        const token = jwt.generateJWT(newUser);

        return { token }
    }
}

module.exports = mutation
