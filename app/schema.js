const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    firstName: String
    lastName: String
  }
  type Query {
    users: [User]
  }
`);
