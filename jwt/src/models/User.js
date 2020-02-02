const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  active: Boolean
})

const User = mongoose.model('user', UserSchema)

module.exports = User