const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const { Invite } = require('../../../app/db/models');

const { createUserAndFetchToken } = require('../../utils')

const { authRequest } = require('../../requestSender');

describe('Delete invitation', () => {

  let invitation = {};
  let token = {};

  beforeEach(async () => {
    token = await createUserAndFetchToken();
    invitation = await Invite.generate();
  });

  it('Returns 200 and deletes invitation', async () => {
    const res = await authRequest(token, 'delete', `/api/v1/invites/${invitation.id}`);

    res.should.have.status(200);
    const deletedInvite = await Invite.findOne({ where: { id: invitation.id } });
    expect(deletedInvite).to.be.equal(null)
  })
})
