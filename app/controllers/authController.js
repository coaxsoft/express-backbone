const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { User, PasswordReset, Role, Sequelize } = require('../db/models');
const jwt = require('../functions/jwt');
const emitter = require("../events/emitter");

async function emailAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.json({ token });
}

async function register(req, res, next) {
  const { email, firstName, lastName, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  try {
    if (existingUser) return next({ status: 409 }); // 409 Conflict

    const newUser = await User.create({ email, firstName, lastName, password });
    const userRole = await Role.findOne({ where: { roleName: 'User' } });
    await newUser.setRoles(userRole);

    const user = await User.findOne({
      where: { email },
      include: [{
        model: Role,
        attributes: ['id', 'roleName'],
        through: { attributes: [] }
      }]
    });

    emitter.emit("userRegistration", user);

    return res.json({ user });
  } catch (e) {
    return next(e);
  }
}

async function verify(req, res, next) {
  const { code } = req.params;
  const decodedUser = jwt.verifyJWT(code);
  if (!decodedUser) {
    return next({ status: 401 }); //TODO is that correct code?
  }

  const user = await User.findOne({ where: { email: decodedUser.email } });

  if (!user) return next({ status: 404 });
  user.verifiedAt = moment.now();

  return res.json({ user });
}

async function forgotPassword(req, res, next) {
  const { email, slug } = req.body;
  let user = await User.findOne({ where: { email }, include: [{ model: PasswordReset }] });

  if (!user) return next({ status: 404 });

  const code = await PasswordReset.create({
    code: uuidv4()
  });

  if (user.PasswordReset) user.PasswordReset.destroy();

  await user.setPasswordReset(code);
  user = await User.findOne({ where: { email }, include: [{ model: PasswordReset }] });

  emitter.emit("forgotPassword", user, slug);

  return res.status(204).end();
}

async function forgotPasswordCheck(req, res, next) {
  const { code, password } = req.body;

  const user = await User.findOne({
    include: [{
      model: PasswordReset,
      where: {
        [Sequelize.Op.and]: [{
          code
        },
        {
          createdAt: { [Sequelize.Op.gte]: moment().subtract(1, 'hour') }
        }]
      }
    }]
  });

  if (!user) return next({ status: 404 });

  user.PasswordReset.destroy();
  user.password = password;
  user.save();

  return res.status(200).send();
}

async function googleAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.redirect(`${process.env.CLIENT_DOMAIN}/login/${token}`);
}

async function facebookAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.redirect(`${process.env.CLIENT_DOMAIN}/login/${token}`);
}

module.exports = {
  googleAuth,
  facebookAuth,
  emailAuth,
  register,
  verify,
  forgotPassword,
  forgotPasswordCheck
};
