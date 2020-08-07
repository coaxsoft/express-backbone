const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');

const server = require('../../app/app');

describe('Testing users query', () => {
  it('Returns 200 with users', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: '{ users { firstName lastName } }' })
      .expect(200);

    console.log(res.body);
  });
})
