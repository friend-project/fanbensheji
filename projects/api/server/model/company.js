const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const company = sequelize.define(
  'company',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    company: Sequelize.STRING,
    logo: Sequelize.STRING,
    tel: Sequelize.STRING,
    mail: Sequelize.STRING,
    address: Sequelize.STRING,
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = company
