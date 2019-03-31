const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const VerifyToken = require('./VerifyToken');
const config = require('../config');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = new User({ email: req.body.email, password: hashedPassword });

  await user.save().catch(err => res.status(500).send('There was a problem registering the user.'));

  const token = jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: '60s' });

  res.send({ auth: true, token });
});

router.get('/me', VerifyToken, async (req, res) => {
  const user = await User.findById(res.locals.user.id, { password: 0, __v: 0 }).catch(err => res.status(500).send('There was a problem finding the user.'));

  if (!user) {
    return res.status(404).send('No user found.');
  }

  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).catch(err => res.status(500).send('Error on the server.'));

  if (!user) {
    return res.status(404).send('No user found.');
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: '60s' });

  res.send({ auth: true, token });
});

router.get('/logout', (req, res) => {
  res.send({ auth: false, token: null });
});

module.exports = router;