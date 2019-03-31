module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/jwt_db'
  }
};