const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/fileupload', (req, res) => {
    //const storage = multer.memoryStorage();
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, 'tmp'));
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    });

    const upload = multer({
        storage: storage
    }).single('file');

    upload(req, res, (err) => {
        if (err) {
            console.error(err);
        }

        console.log(req.file);
    });

    res.end();
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});