const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const tool = require('../../library/tool')

const getContact = async (ctx) => {
  try {
    const rst = await ctx.sql.contact
      .findAll({
        attributes: [
          'id',
          'name',
          'mail',
          'tel',
          'message',
          'create_time',
          'update_time',
        ],
        order: [
          ['id', 'DESC'],
        ],
      })

    const a = rst.map(
      (v) => ({
        ...v.dataValues,
        time: tool.formatTime(v.dataValues.create_time, 'YYYY-MM-DD HH:mm:ss')
      })
    )

    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '没有匹配的查询结果' : '',
      data: a || [],
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
  'GET /contact': getContact,
}
