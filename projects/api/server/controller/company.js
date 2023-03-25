const Sequelize = require('sequelize')

const getCompany = async (ctx) => {
  try {
    const rst = await ctx.sql.company
      .findOne({
        attributes: [
          'id',
          'company',
          'logo',
          'tel',
          'mail',
          'address',
        ],
        where: {
          id: 1,
        },
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

const putCompany = async (ctx) => {
  try {
    const {
      company,
      logo,
      tel,
      mail,
      address,
    } = ctx.request.body

    rst = await ctx.sql.company
      .update(
        {
          company,
          logo,
          tel,
          mail,
          address,
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
  'GET /company': getCompany,
  'PUT /company': putCompany,
}
