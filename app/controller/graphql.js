const Router = require('koa-router');
const graphql = new Router();
const {makeExecutableSchema, addErrorLoggingToSchema, SchemaError} = require('graphql-tools');
const {graphqlKoa, graphiqlKoa} = require('graphql-server-koa');
const {getHello,changeWorld} = require('../service/hello');

const typeDefs = `
  type Hello {
    id: ID
    content: String
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
      if(content == 'world'){
        return new SchemaError({
          errorCode: 1223,
          msg: '这个world已经存在了'
        })
      }
      return changeWorld(content);
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
