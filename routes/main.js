const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const models = require('../models')
// const modelName = require('../models/modelname')
var sess

router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
  secret: 'alexisthegreatest',
  resave: false,
  saveUninitialized: true
}))
router.use(expressValidator())

router.get('/', function (req, res) {
  sess = req.session
  if (sess.username) {
    return res.render('index')
  } else {
    return res.redirect('/login')
  }
})

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.post('/signup', function (req, res) {
  const user = models.User.build({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  user.save()
    .then(function () {
      res.redirect('/')
    })
})

router.post('/login', function (req, res) {
  sess = req.session

  models.User.findOne({
    where: {
      username: req.body.username
    }}).then(function (user) {
      if (user.username === req.body.username && user.password === req.body.password) {
        sess.username = req.body.username
        sess.password = req.body.password
        console.log('the user is' + sess.username)
        console.log('their password is' + sess.password)
        return res.redirect('/')
      } else if (user.username === req.body.username && user.password !== req.body.password) {
        console.log('password was not correct')
        return res.redirect('/login')
      }
    })
})

router.post('/newUser', function (req, res) {
  res.redirect('/signup')
})

router.post('/logout', function (req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''

  res.redirect('/')
})

module.exports = router
