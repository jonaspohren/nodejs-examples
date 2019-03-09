const express = require('express');
require('express-async-errors');

const app = express();

app.get('/', async (req, res, next) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('async error');
        }, 2000);
    });
});

/* app.get('/', async (req, res, next) => {
  await new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('async error');
      }, 2000);
  }).catch(err => next(err));
}); */

app.use((err, req, res, next) => {
    res.send(err);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})