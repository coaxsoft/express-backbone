const { v4: uuidv4 } = require('uuid');
const { Invite } = require('../db/models');
const emitter = require("../events/emitter");

async function inviteUser(req, res, next) {
  const { email, slug } = req.body;
  const existingInvite = await Invite.findOne({ where: { email } });
  if (existingInvite) return next({ status: 409 });

  const invite = await Invite.create({
    email,
    inviteCode: uuidv4(),
    authorId: req.user.id
  });

  emitter.emit("userInvitation", invite, slug);

  return res.json(invite);
}

async function deleteInvitation(req, res) {
  const { id } = req.params;

  await Invite.destroy({ where: { id } });

  return res.end();
}

async function cancelInvitation(req, res) {
  const { inviteCode } = req.params;

  const updateResult = await Invite.update({
    status: Invite.constants.canceledInvite
  }, {
    where: {
      inviteCode: inviteCode,
      status: Invite.constants.newInvite
    }
  });

  return updateResult[0] ? res.end() : res.status(400).end(); //TODO redirect?
}

async function acceptInvitation(req, res) {
  const { inviteCode } = req.params;

  const updateResult = await Invite.update({
    status: Invite.constants.acceptedInvite
  }, {
    where: {
      inviteCode: inviteCode,
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
