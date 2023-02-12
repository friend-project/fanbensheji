const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const tag = sequelize.define(
  'tag',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    tag: Sequelize.STRING(128),
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = tag
