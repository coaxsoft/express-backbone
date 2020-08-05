const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const { createUserAndFetchToken } = require('../../utils');
const { User } = require('../../../app/db/models');

const { authRequest } = require('../../requestSender');

describe('Delete user - allow - Admin', () => {

  let token = '';

  beforeEach(async () => {
    token = await createUserAndFetchToken({ role: 'Admin' });
  });

  it('Returns 200', async () => {
    const user = await User.generate();
    const res = await authRequest(token, 'delete', `/api/v1/users/${user.id}`);

    res.should.have.status(200);
  });
});
