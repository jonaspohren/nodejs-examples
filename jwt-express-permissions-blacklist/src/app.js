const express = require('express')
const exJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const blacklist = require('express-jwt-blacklist')
const bcrypt = require('bcryptjs')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()

blacklist.configure({
  tokenId: 'sub',
  store: {
    type: 'redis',
    host: config.redis.host,
    port: config.redis.port,
    keyPrefix: 'blacklist:'
  }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(exJwt({
  secret: config.jwt.secret,
  isRevoked: blacklist.isRevoked
}).unless({ path: ['/login'] }))

app.get('/me', guard.check('read'), (req, res) => {
  res.json(req.user)
})

app.post('/login', (req, res) => {
  const user = config.users.find(u => u.username === req.body.username)

  if (!user) {
    return res.sendStatus(404)
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

  if (!passwordIsValid) {
    return res.statusStatus(401)
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username, permissions: ['read'] },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )

  res.json({ token })
})

app.get('/logout', (req, res) => {
  blacklist.revoke(req.user)
  res.sendStatus(200)
})

app.listen(config.port)
