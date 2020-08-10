const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type TokenResponse {
    token: String
  }
  
  type User {
    firstName: String
    lastName: String
  }
  
  type Mutation {
    login(email: String, password: String): TokenResponse
  }
  
  type Query {
    users: [User]
  }
`);
