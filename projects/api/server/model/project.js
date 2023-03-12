const Sequelize = require('sequelize')
const sequelize = require('../../library/sequelize')

const project = sequelize.define(
  'project',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    tag: Sequelize.TINYINT(),
    title: Sequelize.STRING(128),
    banner: Sequelize.STRING(128),
    year: Sequelize.STRING(128),
    recommend: Sequelize.TINYINT,
    content: Sequelize.STRING,
  },
  {
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
)

module.exports = project
