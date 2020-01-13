const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: []
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.simple()
    )
  }))
}

module.exports = logger
