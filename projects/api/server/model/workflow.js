const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const workflow = sequelize.define(
  'workflow',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    icon: Sequelize.STRING(128),
    title: Sequelize.STRING(128),
    describe: Sequelize.STRING(1024),
    price: Sequelize.STRING(512),
    turn: Sequelize.TINYINT(),
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = workflow
