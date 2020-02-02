const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
require('./src/database/db')
const errorHandler = require('./src/middlewares/errorHandler')
const config = require('./config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const AuthController = require('./src/controllers/authController')

app.use('/api/auth', AuthController)

app.use(errorHandler)

app.listen(config.express.PORT)