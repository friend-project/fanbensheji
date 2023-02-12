const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const tool = require('../../library/tool')

const postUser = async (ctx) => {
  try {
    const {
      username,
      password,
    } = ctx.request.body

    const rst = await ctx.sql.user
      .findAll({
        attributes: [
          'id',
        ],
        where: {
          username,
          password,
        }
      })

    ctx.body = {
      code: rst ? 0 : 1,
      msg: rst ? '' : '账号或密码错误',
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
  'POST /user': postUser,
}
