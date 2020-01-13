require('dotenv').config()

module.exports = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    channel: 'tasks',
    exchange: 'logs'
  }
}
