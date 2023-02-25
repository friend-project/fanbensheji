const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const about = sequelize.define(
  'about',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    content: Sequelize.STRING,
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = about