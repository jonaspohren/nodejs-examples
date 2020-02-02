require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    apiKey: process.env.STRIPE_API_KEY
  }
}
