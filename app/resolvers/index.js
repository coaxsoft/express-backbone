const passport = require('../middlewares/passport');

const auth = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) reject(err);
    if (user) resolve(user);

    else reject(new Error('Unauthorized'));
  })(req, res);
});

module.exports = {
  users: () => {
    return [{
      firstName: 'boss',
      lastName: 'bosssss',
      test: 'wefwef'
    }];
  },

  login: (root, ctx) => auth(ctx.req, ctx.res)
    .then(() => {
      return { token: 'fg' }
    })
    .catch((err) => {
      throw err;
    }),
};
