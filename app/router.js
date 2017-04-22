const Router = require('koa-router');
const graphql = require('./controller/graphql');
// const graphql = new Router();
const router = new Router();
const test = new Router();


test.get('/test', function(ctx, next){
  ctx.body = 'test';
})
test.get('/test1', function(ctx, next){
  ctx.body = 'test1';
})
test.get('/test2', function(ctx, next){
  ctx.body = 'test2';
})
// graphql.get('/', (ctx,next)=>{
//   ctx.body = 'graphql'
// })

router.use('/graphql', graphql.routes())
router.use('/test', test.routes())
router.use('/', ctx => {
  ctx.body = '/'
})

module.exports = router;

