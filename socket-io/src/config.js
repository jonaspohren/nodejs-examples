require('dotenv').config()

module.exports = {
  server: {
    port: parseInt(process.env.PORT) || 3000,
    options: {
      path: '/io',
    }
  },
  client: {
    url: `http://127.0.0.1:${process.env.PORT || 3000}`,
    options: {
      path: '/io'
    }
  }
}
