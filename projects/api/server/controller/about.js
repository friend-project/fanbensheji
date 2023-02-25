const Sequelize = require('sequelize')

const getAbout = async (ctx) => {
  try {
    const rst = await ctx.sql.about
      .findOne({
        attributes: [
          'id',
          'content',
          'create_time',
          'update_time',
        ],
      })

    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '没有匹配的查询结果' : '',
      data: rst || {},
    }
  } catch (err) {
    ctx.logger.error(err)
    ctx.body = {
      code: 1,
      msg: 'error',
      data: [],
    }
  }
}

const putAbout = async (ctx) => {
  try {
    const { content } = ctx.request.body

    rst = await ctx.sql.about
      .update(
        {
          content,
        },
        {
          where: {
            id: 1,
          }
        }
      )


    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '失败' : '',
      data: rst || {},
    }
  } catch (err) {
    ctx.logger.error(err)
    ctx.body = {
      code: 1,
      msg: 'error',
      data: [],
    }
  }
}

module.exports = {
  'GET /about': getAbout,
  'PUT /about': putAbout,
}
