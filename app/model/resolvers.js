const SchemaError = require('graphql-tools');
const helloSerivce = require('./hello/helloService');

const base = {
  Query: {
    async hello(root, args, context) {
      const result = await helloSerivce.getHello();
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
      return helloSerivce.changeWorld(content);
    }
  }
};

module.exports = base;
