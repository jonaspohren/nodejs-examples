const Queue = require('bull')
const config = require('./config')

module.exports = new Queue('task_queue', config.redis.url)
