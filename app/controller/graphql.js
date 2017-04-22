const Router = require('koa-router');
const graphql = new Router();
const {makeExecutableSchema, addErrorLoggingToSchema} = require('graphql-tools');
const {graphqlKoa, graphiqlKoa} = require('graphql-server-koa');
const {getHello} = require('../service/hello');


const Tags = require('./connectors');

const typeDefs = `
  type Hello {
    id: ID
    content: String,
  }

  type Query {
    hello: Hello
  }
  schema {
    query: Query
  }
`;
let word = 'Hello world!';
const resolver = {
  Query: {
    hello(root, args, context) {
      return {
        id: '123',
        content: 'ewqrwerwerwerwer'
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolver,
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
