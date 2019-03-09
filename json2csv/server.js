const express = require('express');
const json2csv = require('json2csv');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/download/csv', (req, res) => {
    const file = path.join(__dirname, 'tmp', 'file.csv');
    const csv = json2csv({
        data: [
            {
                name: 'James',
                age: 28,
                state: {
                    name: 'California'
                }
            },
            {
                name: 'Robert',
                age: 25,
                state: {
                    name: 'Texas'
                }
            },
            {
                name: 'Paul',
                age: 32,
                state: {
                    name: 'New York'
                }
            }
        ],
        fields: ['name', 'age', 'state.name'],
        fieldNames: ['NAME', 'AGE', 'STATE']
    });

    fs.writeFile(file, csv, (err) => {
        if (err) {
            console.error(err);
        }

        res.download(file);
   });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});