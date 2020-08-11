const bcrypt = require('bcrypt');
const { User, Role } = require('../db/models');
const jwt = require("../utils/jwt");

module.exports = {
  users: () => {
    return [{
      firstName: 'boss',
      lastName: 'bosssss',
      test: 'wefwef'
    }];
  },

  login: async (root, ctx) => {
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
