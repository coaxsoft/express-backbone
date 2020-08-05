const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const { createUserAndFetchToken } = require('../../utils')

const { authRequest } = require('../../requestSender');

describe('Get users - allow - Admin', () => {

  let token = '';

  beforeEach(async () => {
    token = await createUserAndFetchToken({ role: 'Admin' });
  });

  it('Returns 200 with users', async () => {
    const res = await authRequest(token, 'get', '/api/v1/users/');

    res.should.have.status(200);
    expect(res.body.data).to.be.an('array')
  });
});
