const mongoose = require('mongoose')
const config = require('../../config')

mongoose.connect(config.mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
