const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { User, PasswordReset, Role, Sequelize } = require('../db/models');
const { sendVerifyEmail } = require('../emails/verifyAccountEmail');
const jwt = require('../functions/jwt');
const { sendResetPasswordEmail } = require('../emails/resetPasswordEmail');
const Op = Sequelize.Op;

async function emailAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.json({ token });
}

async function register(req, res, next) {
  const { email, firstName, lastName, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  try {
    if (existingUser) return next({ status: 409 }); //409 Conflict

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password
    });
    const userRole = await Role.findOne({ where: { roleName: 'User' } });
    await newUser.setRoles(userRole);

    const user = await User.findOne({ where: { email } });
    sendVerifyEmail(user);
    
    return res.json({ user });
  } catch (e) {
    console.error(e.message);
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
  const user = await User.findOne({ where: { email }, include: [{ model: PasswordReset }] });

  if (!user) return next({ status: 404 });

  const code = await PasswordReset.create({
    code: uuidv4()
  });

  if (user.PasswordReset) user.PasswordReset.destroy();

  await user.setPasswordReset(code);

  sendResetPasswordEmail(user, req.headers.host, slug);

  return res.json(true);
}

async function forgotPasswordCheck(req, res, next) {
  const { code, password } = req.body;

  const user = await User.findOne({
    include: [{
      model: PasswordReset,
      where: {
        [Op.and]: [{
          code
        },
        {
          createdAt: {
            [Op.gte]: moment().subtract(1, 'hour')
          }
        }]
      }
    }]
  });

  if (!user) return next({ status: 404 });

  user.PasswordReset.destroy();
  user.password = password;
  user.save();

  return res.end();
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