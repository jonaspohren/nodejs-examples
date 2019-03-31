const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongodb.uri, { useNewUrlParser: true });