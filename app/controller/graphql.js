const Router = require('koa-router');
const graphql = new Router();
const {makeExecutableSchema, addErrorLoggingToSchema} = require('graphql-tools');
const {graphqlKoa, graphiqlKoa} = require('graphql-server-koa');
const typeDefs = require('../model/typeDefs');
const resolvers = require('../model/resolvers');

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
