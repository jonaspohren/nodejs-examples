const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log(`Process ${process.pid} is listening on port 3000`);
});