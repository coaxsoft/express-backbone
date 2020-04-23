const { v4: uuidv4 } = require('uuid');
const { Invite, Sequelize } = require('../db/models');
const { sendInvitationEmail } = require('../emails/invite-email');
const Op = Sequelize.Op;

async function inviteUser(req, res, next) {
  const { email, slug } = req.body;

  const existingInvite = await Invite.findOne({ where: { email } });
  if (existingInvite) return next({ status: 409 });

  const invite = await Invite.create({
    email,
    invite_code: uuidv4(),
    author_id: req.user.id
  });
  sendInvitationEmail(invite, req.headers.host, slug);
  return res.json(invite);
}

async function deleteInvitation(req, res) {
  const { id } = req.params;

  await Invite.destroy({ where: { id } });

  return res.end();
}

async function cancelInvitation(req, res) {
  const { invite_code } = req.params;

  const updateResult = await Invite.update({
    status: Invite.constants.canceledInvite
  }, {
    where: {
      invite_code,
      status: Invite.constants.newInvite
    }
  });

  return updateResult[0] ? res.end() : res.status(400).end(); //TODO redirect?
}

async function acceptInvitation(req, res) {
  const { invite_code } = req.params;

  const updateResult = await Invite.update({
    status: Invite.constants.acceptedInvite
  }, {
    where: {
      invite_code,
      status: Invite.constants.newInvite
    }
  });

  //TODO create user and login?

  return updateResult[0] ? res.end() : res.status(400).end(); //TODO redirect?
}


module.exports = {
  inviteUser,
  deleteInvitation,
  cancelInvitation,
  acceptInvitation
};