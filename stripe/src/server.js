const express = require('express')
const config = require('./config')
const stripe = require('stripe')(config.stripe.secretKey)

const app = express()

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd'
  })

  res.render('index', {
    client_secret: paymentIntent.client_secret,
    api_key: config.stripe.apiKey
  })
})

app.listen(config.server.port)
