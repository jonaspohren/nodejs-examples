const express = require('express');
const db = require('./db');

const app = express();

const AuthController = require('./auth/AuthController');

app.use('/api/auth', AuthController);

module.exports = app;