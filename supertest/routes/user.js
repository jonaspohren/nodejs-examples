const express = require('express')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.json({ name: 'Jonas Pohren', age: 31, job: { title: 'Software Developer' } })
  })

  .post((req, res) => {
    res.json({ id: 1, name: req.body.name })
  })

module.exports = router