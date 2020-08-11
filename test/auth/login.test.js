const chai = require('chai');
const should = chai.should();
const _ = require('lodash');
const expect = chai.expect;
const request = require('supertest');
const { User } = require('../../app/db/models');

const server = require('../../app/app');

describe('Testing login mutation', async () => {
  it('Returns 200 with errors if user not exist in the DB', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: `mutation {
          login(email: "test@test.com", password: "erfer") {
            token
          }
        }`
      })
      .expect(200);

    expect(_.isEmpty(res.body.errors)).to.be.equal(false);
  })

  it('Returns 200 with token', async () => {
    const user = await User.generate({ password: '123456' });
    const res = await request(server)
      .post('/graphql')
      .send({ query: `mutation {
          login(email: "${user.email}", password: "123456") {
            token
          }
        }`
      })
      .expect(200);
    expect(_.isEmpty(res.body.errors)).to.be.equal(true);
    expect(res.body.data.login.token).to.not.equal(null);
  })

});
