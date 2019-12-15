const fs = require('fs');
const axios = require('axios');
const path = require('path');
const bluebird = require('bluebird');
const uuidv1 = require('uuid/v1');

const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

bluebird.promisifyAll(fs);

(async () => {
  const bucketName = `my-new-bucket-${~~(Math.random() * 1e6)}`;
  const filename = 'hello.txt';

  await storage.createBucket(bucketName)

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`folder/${uuidv1()}.txt`);

  const response = await file.getSignedUrl({ action: 'write', expires: Date.now() + 60 * 1000, contentType: 'text/plain' });
  const signedUrl = response[0];

  await fs.writeFileAsync(filename, 'Hello World!');

  const readStream = fs.createReadStream(path.join(__dirname, filename));

  await axios.put(signedUrl, readStream, { headers: { 'Content-Type': 'text/plain' } });
})();