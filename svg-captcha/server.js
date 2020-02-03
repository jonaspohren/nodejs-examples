const svgCaptcha = require('svg-captcha')
const express = require('express')
const session = require('express-session')

const app = express()

app.set('view engine', 'ejs')
app.use(session({ resave: false, saveUninitialized: false, secret: 'secret' }))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const captcha = svgCaptcha.create({ noise: 2, ignoreChars: 'iIlL' })

  req.session.captcha = captcha.text

  const message = req.session.message || ''

  req.session.message = null

  res.render('index', { captcha: captcha.data, message })
})

app.post('/captcha', (req, res) => {
  if (req.session.captcha === req.body.answer) {
    req.session.message = 'OK'
  } else {
    req.session.message = 'WRONG'
  }

  res.redirect('/')
})

app.listen(3000)
