const Router = require('koa-router');
const graphql = require('./controller/graphql');
const router = new Router();

router.use('/graphql', graphql.routes())
router.use('/', ctx => {
  ctx.body = '/'
})

module.exports = router;

