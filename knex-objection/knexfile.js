require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations'
    }
  },
  staging: {},
  production: {}
};
