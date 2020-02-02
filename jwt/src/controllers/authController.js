const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const User = require('../models/User')
const VerifyToken = require('../middlewares/verifyToken')
const config = require('../../config')

const router = express.Router()

router.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password)

  const user = new User({ email: req.body.email, password: hashedPassword, active: true })

  await user.save()

  const token = jwt.sign({ id: user._id }, fs.readFileSync(config.jwt.secret.PRIVATE_KEY), { algorithm: 'RS256', expiresIn: config.jwt.EXPIRES_IN })

  res.send({ token })
})

router.get('/me', VerifyToken, async (req, res) => {
  const user = await User.findById(res.locals.user.id, { password: 0, __v: 0 })

  if (!user) {
    return res.status(404).send('No user found.')
  }

  res.send(user)
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send('No user found.')
  }

  if (!user.active) {
    return res.status(403).send({ message: 'User is not active.' })
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

  if (!passwordIsValid) {
    return res.status(401).send('Wrong password.')
  }

  const token = jwt.sign({ id: user._id }, fs.readFileSync(config.jwt.secret.PRIVATE_KEY), { algorithm: 'RS256', expiresIn: config.jwt.EXPIRES_IN })

  res.send({ token })
})

module.exports = router