const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const tool = require('../../library/tool')

const getProjectList = async (ctx) => {
  let rst = await ctx.sql.project
    .findAll({
      attributes: [
        'id',
        'tag',
        'title',
        'banner',
        'year',
        'recommend',
        'create_time',
        'update_time',
      ],
      order: [
        ['id', 'ASC'],
      ],
    })
  rst = rst.map(
    (v) => ({
      ...v.dataValues,
      time: tool.formatTime(v.dataValues.create_time, 'YYYY-MM-DD HH:mm:ss')
    })
  )
  return rst
}

const getProjectDetail = async (ctx, id) => {
  let rst = await ctx.sql.project
    .findOne({
      attributes: [
        'id',
        'tag',
        'title',
        'banner',
        'year',
        'recommend',
        'content',
        'create_time',
        'update_time',
      ],
      where: {
        id,
      }
    })
  return rst
}

const getProject = async (ctx) => {
  try {
    const { id } = ctx.request.query
    let rst = null
    if (id) {
      rst = await getProjectDetail(ctx, id)
    } else {
      rst = await getProjectList(ctx)
    }

    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '没有匹配的查询结果' : '',
      data: rst || (id ? {} : []),
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

const putProject = async (ctx) => {
  try {
    const {
      id,
      tag,
      title,
      banner,
      year,
      recommend,
      content,
    } = ctx.request.body

    let rst = { id }
    let msg = ''

    if (id) {
      rst = await ctx.sql.project
        .update(
          {
            tag,
            title,
            banner,
            year,
            recommend,
            content,
          }, {
            where: {
              id,
            },
          }
        )
    } else {
      rst = await ctx.sql.project
        .create({
          tag,
          title,
          banner,
          year,
          recommend,
          content,
        })
    }


    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst ? '失败' : '',
      data: rst || [],
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

const dltProject = async (ctx) => {
  try {
    const {
      id,
    } = ctx.request.body

    rst = await ctx.sql.project
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
  'GET /project': getProject,
  'PUT /project': putProject,
  'DELETE /project': dltProject,
}
