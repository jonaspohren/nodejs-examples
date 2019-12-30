const { createLogger, format, transports } = require('winston')
const WinstonCloudWatch = require('winston-cloudwatch')
const config = require('./config.js')

const logger = createLogger({
  level: config.logger.level,
  transports: [new WinstonCloudWatch ({
    logGroupName: config.cloudWatch.logGroup,
    logStreamName: config.cloudWatch.logStream,
    awsAccessKeyId: config.cloudWatch.awsAccessKeyId,
    awsSecretKey: config.cloudWatch.awsSecretAccessKey,
    awsRegion: config.cloudWatch.awsRegion,
    jsonMessage: true
  })]
})

if (config.env.isDev) {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

module.exports = logger
