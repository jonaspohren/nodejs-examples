const bluebird = require('bluebird');
const mongoose = require('mongoose');
const redis = require('redis');
const User = require('./models/user');

bluebird.promisifyAll(redis.RedisClient.prototype);

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

const client = redis.createClient('redis://127.0.0.1');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(expireTimeSec = 60) {
  this._cache = { expireTimeSec };

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this._cache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));

  console.log(`key: ${key}`);

  const cachedValue = await client.getAsync(key);

  if (cachedValue) {
    console.log(`cachedValue: ${cachedValue}`);

    const value = JSON.parse(cachedValue);

    return Array.isArray(value) ? value.map(val => new this.model(val)) : new this.model(value);
  }

  const result = await exec.apply(this, arguments);

  await client.setAsync(key, JSON.stringify(result), 'EX', this._cache.expireTimeSec);

  console.log(`result: ${result}`);

  return result;
};

async function init() {
  await mongoose.connect('mongodb://127.0.0.1/my_db');

  const user = new User({ name: 'Jonas' });

  await user.save();

  const users = await User.find({ name: { $eq: 'Jonas' } }).cache();

  console.log(`users: ${users}`);

  await User.collection.drop();

  await client.quitAsync();
  await mongoose.disconnect();
};

init().catch(err => console.error(err));