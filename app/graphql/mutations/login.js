const bcrypt = require('bcrypt');

const { GraphQLString } = require('graphql');
const tokenType = require('../types/token');
const jwt = require('../../utils/jwt');

const { User } = require('../../db/models');

const mutation = {
    type: tokenType,
    args: {
        email: { type: GraphQLString }, password: { type: GraphQLString }
    },
    async resolve (root, input, ctx) {

        const { email, password } = input;

        const user = await User.scope(['withPassword', 'withRoles']).findOne({ where: { email } });

        if (!user || !user.password) {
            throw new Error('Email or password is wrong');
        }

        if (user.verifiedAt === null) {
            throw new Error('Verify your email first');
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare === false) {
            throw new Error('Email or password is wrong');
        }

        const token = jwt.generateJWT(user);

        return { token }
    }
}

module.exports = mutation
