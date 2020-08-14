const chai = require('chai');
const should = chai.should();
const _ = require('lodash');
const faker = require('faker');
const expect = chai.expect;
const request = require('supertest');
const { User } = require('../../app/db/models');

const server = require('../../app/app');

describe('Testing registration mutation', async () => {
  it('Return error if user exist in the DB', async () => {

    const email = faker.internet.email();
    await User.generate({ password: '123456', email });

    const res = await request(server)
      .post('/graphql')
      .send({ query: `mutation {
          registration(email: "${email}", password: "erfer") {
            token
          }
        }`
      });

    expect(_.isEmpty(res.body.errors)).to.be.equal(false);
  })

  it('Returns 200 with token', async () => {
    const email = faker.internet.email();
    const res = await request(server)
      .post('/graphql')
      .send({ query: `mutation {
          registration(email: "${email}", password: "123456") {
            token
          }
        }`
      });
    expect(_.isEmpty(res.body.errors)).to.be.equal(true);
    expect(res.body.data.registration.token).to.not.equal(null);
  })

});
