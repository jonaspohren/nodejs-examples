const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient();

(async () => {
  await client.setAsync('0', 'Hello World!', 'EX', 5);

  const value = await client.getAsync('0');

  console.log(value);

  await client.hsetAsync('1', 'Hello', 'World');
  await client.hsetAsync('1', 'Hello!', 'World!');

  const values = await client.hmgetAsync('1', 'Hello', 'Hello!');

  console.log(values);

  await client.quitAsync();
})();