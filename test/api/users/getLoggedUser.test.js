const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const { createUserAndFetchToken } = require('../../utils')

const { authRequest } = require('../../requestSender');

describe('Get logged user - allow - *', () => {

  let token = '';

  beforeEach(async () => {
    token = await createUserAndFetchToken();
  });

  it('Returns 200 with users', async () => {
    const res = await authRequest(token, 'get', '/api/v1/users/me');

    res.should.have.status(200);
    expect(res.body.firstName).to.be.an('string')
    expect(res.body.lastName).to.be.an('string')
  });
});
