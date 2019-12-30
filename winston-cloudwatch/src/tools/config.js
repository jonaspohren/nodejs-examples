require('dotenv').config()

module.exports = {
  env: {
    isDev: process.env.NODE_ENV || 'development' === 'development',
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info'
  },
  cloudWatch: {
    logGroup: process.env.LOG_GROUP,
    logStream: process.env.LOG_STREAM,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION
  }
}
