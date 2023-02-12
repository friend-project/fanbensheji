const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const user = sequelize.define(
  'user',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    username: Sequelize.STRING(128),
    password: Sequelize.STRING(512),
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = user
