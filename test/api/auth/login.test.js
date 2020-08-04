const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const { User } = require('../../../app/db/models');

const { request } = require('../../requestSender');

describe('Login tests - api/v1/auth/login - POST', () => {
  it('Returns 422 without email', async () => {
    const res = await request('post', '/api/v1/auth/login', {
      password: '1234567'
    });

    res.should.have.status(422);
  });

  it('Returns 200 with jwt token in the body', async () => {
    const password = '123123';
    const user = await User.generate({ password });

    const res = await request('post', '/api/v1/auth/login', {
      password: '123123',
      email: user.email
    });

    res.should.have.status(200);
    expect(res.body.token).to.be.a('string');
  })
})
