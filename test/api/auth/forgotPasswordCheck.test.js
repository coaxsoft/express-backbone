const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const { User, PasswordReset } = require('../../../app/db/models');

const { request } = require('../../requestSender');

describe('Forgot password check - api/v1/auth/check-forgot-password - POST', () => {
  it('Returns 404 if user is not found by the code', async () => {
    const res = await request('post', '/api/v1/auth/check-forgot-password', {
      code: 'fake',
      password: 'not-fake'
    });

    res.should.have.status(404);
  });

  it('Returns 200', async () => {
    const user = await User.generate();
    const passReset = await PasswordReset.generate({ userId: user.id });

    const res = await request('post', '/api/v1/auth/check-forgot-password', {
      code: passReset.code,
      password: 'not-fake'
    });

    res.should.have.status(200);
  })
});
