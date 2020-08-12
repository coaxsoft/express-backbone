const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const _ = require('lodash');
const request = require('supertest');

const server = require('../../app/app');
const { createUserAndFetchToken } = require('../utils');

describe('Testing users query', () => {

  let token = {};

  beforeEach(async () => {
    token = await createUserAndFetchToken();
  });

  it('Returns error without token in headers', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: '{ users { firstName lastName } }' });

    expect(_.isEmpty(res.body.errors)).to.be.equal(false);
    expect(res.body.errors[0].message).to.be.equal('You are not authorized!');
  });

  it('Returns 200 with users', async () => {
    const res = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: '{ users { firstName lastName } }' });

    expect(res.body.data.users).to.be.an('array');
  });
})
