module.exports = {
  express: {
    PORT:process.env.PORT || 3000
  },
  jwt: {
    secret: {
      PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
      PUBLIC_KEY: process.env.JWT_PUBLIC_KEY
    },
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '60s'
  },
  mongodb: {
    URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/jwt_db'
  }
}