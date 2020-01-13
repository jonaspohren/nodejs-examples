const express = require('express')
const config = require('./config')
const logger = require('./logger')

const app = express()

const server = app.listen(config.PORT, () => {
  logger.info(`Server listening on port ${server.address().port}`)
})
