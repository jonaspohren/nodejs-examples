const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        const customers = [
            {firstName: 'John', lastName: 'Smith'},
            {firstName: 'Robert', lastName: 'Miller'}
        ];

        res.json(customers);
    });

module.exports = router;