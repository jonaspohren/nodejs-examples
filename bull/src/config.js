require('dotenv').config()

module.exports = {
  redis: {
    url: process.env.REDIS_URL
  }
}
