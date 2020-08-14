const bcrypt = require('bcrypt');
const { User, Role } = require('../db/models');
const jwt = require('../utils/jwt');
const _ = require('lodash');

module.exports = {
  users: (root, ctx) => {
    if (_.isNull(ctx.user) || _.isUndefined(ctx.user)) {
      throw new Error('You are not authorized!')
    }

    return [{
      firstName: 'boss',
      lastName: 'bosssss',
    }];
  },

  login: async (root) => {
    const user = await User.scope(['withPassword', 'withRoles']).findOne({ where: { email: root.email } });

    if (!user || !user.password) {
      throw new Error('Email or password is wrong');
    }

    if (user.verifiedAt === null) {
      throw new Error('Verify your email first');
    }

    const passwordCompare = await bcrypt.compare(root.password, user.password);

    if (passwordCompare === false) {
      throw new Error('Email or password is wrong');
    }

    const token = jwt.generateJWT(user);

    return { token }
  },

  registration: async (root) => {
    const { email, firstName, lastName, password } = root;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('User with this email already exists');

    const newUser = await User.create({ email, firstName, lastName, password });
    const userRole = await Role.findOne({ where: { roleName: 'User' } });
    await newUser.setRoles(userRole);

    const token = jwt.generateJWT(newUser);

    return { token }
  }
};
