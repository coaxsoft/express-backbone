const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const faker = require('faker');
const sinon = require('sinon');
const emitter = require('../../../app/events/emitter');
const mailer = require('../../../app/services/mailer');

const { request } = require('../../requestSender');

describe('Registration tests - api/v1/auth/register - POST', () => {

  let eventSpy = {};
  let sendVerificationEmailSpy = {};

  beforeEach(async () => {
    eventSpy = sinon.spy();
    emitter.on('userRegistration', eventSpy);
    sendVerificationEmailSpy = sinon.stub(mailer, 'sendVerificationEmail').returns(Promise.resolve());
  });

  afterEach(async () => {
    mailer.sendVerificationEmail.restore();
    emitter.off('userRegistration', eventSpy);
  });

  it('Returns 422 without password', async () => {
    const res = await request('post', '/api/v1/auth/register', {
      firstName: 'name',
      lastName: 'last',
      email: 'test@test.com'
    });

    res.should.have.status(422);
  });

  it('Returns 200 with user in the body', async () => {
    const email = `${faker.random.number()}_${faker.internet.email()}`

    const res = await request('post', '/api/v1/auth/register', {
      firstName: 'name',
      lastName: 'last',
      password: '123123',
      email
    });

    res.should.have.status(200);
    expect(res.body.user.email).to.be.equal(email.toLowerCase());
  });

  it('Returns 200 and run function to send email with verification', async () => {
    const email = `${faker.random.number()}_${faker.internet.email()}`

    await request('post', '/api/v1/auth/register', {
      firstName: 'name',
      lastName: 'last',
      password: '123123',
      email
    }).then((res) => {
      res.should.have.status(200);

      return new Promise(resolve => {
        setTimeout(() => {
          sendVerificationEmailSpy.called.should.be.equal(true);
          expect(sendVerificationEmailSpy.args[0][0].email).to.be.equal(email.toLowerCase());
          resolve();
        }, 500);
      });
    });
  })
})