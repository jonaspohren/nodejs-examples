require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '60s'
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
  },
  users: [
    { id: 1, username: 'jonaspohren', password: '$2y$12$HhSmCzEoHBkweXpTPsZcwuyNILq8ixTtDxSGo2g9VJx1.DQKg89xu' }
  ]
}
