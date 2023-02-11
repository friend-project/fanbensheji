const env = process.env.MYSQL

const master = {
  host: '152.136.138.245',
  username: 'root',
  password: 'm',
  database: 'fanben',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: false,
    timestamps: true,
    freezeTableName: true,
  },
  port: 3306,
}

module.exports = {
  master,
}
