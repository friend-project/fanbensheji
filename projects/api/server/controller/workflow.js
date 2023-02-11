const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const tool = require('../../library/tool')

const getContact = async (ctx) => {
  try {
    const rst = await ctx.sql.workflow
      .findAll({
        attributes: [
          'id',
          'icon',
          'title',
          'describe',
          'price',
          'turn',
          'create_time',
          'update_time',
        ],
        order: [
          ['turn', 'ASC'],
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

const putContact = async (ctx) => {
  try {
    const {
      id,
      icon,
      title,
      describe,
      price,
      turn,
    } = ctx.request.body

    let rst = { id }
    let msg = ''

    if (id) {
      rst = await ctx.sql.workflow
        .update(
          {
            id,
            icon,
            title,
            describe,
            price,
            turn,
          }, {
            where: {
              id,
            },
          }
        )
    } else {
      rst = await ctx.sql.workflow
        .create({
          icon,
          title,
          describe,
          price,
          turn,
        })
    }


    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '失败' : '',
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

const dltContact = async (ctx) => {
  try {
    const {
      id,
    } = ctx.request.body

    rst = await ctx.sql.workflow
      .destroy(
        {
          where: {
            id,
          },
        }
      )


    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '删除失败' : '',
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
  'GET /workflow': getContact,
  'PUT /workflow': putContact,
  'DELETE /workflow': dltContact,
}
