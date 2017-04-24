const hello = require('./hello/helloSchema');
const base = `
  type Query {
    hello: Hello
  }
  type Mutation {
    changeWord(content: String!): Hello
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = [base, hello];
