const jwt = require('jsonwebtoken')
const fs = require('fs')
const User = require('../models/User')
const config = require('../../config')

const verifyToken = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' })
  }

  const payload = jwt.verify(token, fs.readFileSync(config.jwt.secret.PUBLIC_KEY), { algorithms: ['RS256'] })

  const user = await User.findById(payload.id)

  if (!user.active) {
    return res.status(403).send({ message: 'User is not active.' })
  }

  delete payload.iat
  delete payload.exp
  delete payload.nbf
  delete payload.jti

  const refreshToken = jwt.sign(payload, fs.readFileSync(config.jwt.secret.PRIVATE_KEY), { algorithm: 'RS256', expiresIn: config.jwt.EXPIRES_IN })

  res.setHeader('X-Authorization-Token', refreshToken)

  res.locals.user = { id: payload.id }

  next()
}

module.exports = verifyToken