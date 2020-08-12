const bcrypt = require('bcrypt');
const { User } = require('../db/models');
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
  }
};