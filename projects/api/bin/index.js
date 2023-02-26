const Koa = require('koa')
const path = require('path')
const cors = require('kcors')
const serve = require('koa-static')
const onerror = require('koa-onerror')
const bodyParser = require('koa-body')

const sql = require('../library/sql')
const route = require('../server/route')
const appConfig = require('../config/app')
const logger = require('../library/logger')

const app = new Koa()
const port = process.env.PORT || appConfig.port || 9529

app.use(cors())
app.use(
  bodyParser({
    multipart: true,
    parsedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)
app.use(serve(path.resolve(__dirname, '../asset/')))
app.use(serve(path.resolve(__dirname, '../upload/')))
app.use(async (ctx, next) => logger(ctx, next, app))
app.use(async (ctx, next) => sql(ctx, next, app))
app.use(async (ctx, next) => route()(ctx, next))

if (process.env.NODE_ENV === 'wds') {
  onerror(app)
}

app.on('error', (e, ctx) => ctx.logger.error(e))

app.listen(port)
