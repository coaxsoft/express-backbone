const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');

const server = require('../app/app');

describe('Testing base endpoint - /graphql', () => {
  it('Returns 200 wit hello world', async () => {
    await request(server)
      .post('/graphql')
      .send({ query: '{ hello }' })
      .expect(200)
  });
})
