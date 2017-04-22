const Koa = require('Koa');
const logger = require('koa-logger');
const convert = require('koa-convert');
const cross = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const router = require('./app/router');

console.log('..start server...')
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())
  .use(convert(cross({origin: '*'})));

module.exports = app;

