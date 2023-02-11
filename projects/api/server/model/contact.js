const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const contact = sequelize.define(
  'contact',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: Sequelize.STRING(128),
    mail: Sequelize.STRING(512),
    tel: Sequelize.STRING(16),
    message: Sequelize.STRING(1024),
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = contact
