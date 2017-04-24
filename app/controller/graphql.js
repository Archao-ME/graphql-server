const Router = require('koa-router');
const graphql = new Router();
const {makeExecutableSchema, addErrorLoggingToSchema} = require('graphql-tools');
const {graphqlKoa, graphiqlKoa} = require('graphql-server-koa');
const {getHello} = require('../service/hello');

const typeDefs = `
  type Hello {
    id: ID
    content: String,
  }
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

const resolvers = {
  Query: {
    async hello(root, args, context) {
      const result = await getHello();
      return result;
    },
  },
  Mutation: {
    changeWord(root,{content}){
      return {
        id: 2,
        content: content
      }
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const logger = {log: (e) => console.error(e.stack)};
addErrorLoggingToSchema(schema, logger);
graphql.get('/', graphiqlKoa({endpointURL: '/graphql'})); // graphql调试器
graphql.post('/', graphqlKoa(
  (ctx) => { // graphql入口
    return {
      schema: schema,
      context: {ctx: ctx},
      debug: true
    };
  }
));
module.exports = graphql;
