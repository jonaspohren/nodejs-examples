const express = require('express');
const customer = require('./lib/routes/customer.js');

const app = express();

app.use('/customer', customer);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});