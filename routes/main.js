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
    return res.render('index', {
      user: sess.username
    })
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

router.get('/logout', function (req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''
  res.redirect('/')
})

router.get('/profile/:id', function (req, res) {
  res.render('profile')
})

router.get('/about', function (req, res) {
  res.render('about')
})

router.post('/signup', function (req, res) {
  if (req.body.password1 === req.body.password2) {
    const user = models.User.build({
      username: req.body.username,
      password: req.body.password1,
      email: req.body.email
    })
    user.save()
      .then(function () {
        return res.redirect('/')
      })
  } else {
    console.log('Passwords do not match')
    return res.render('signup')
  }
})

router.post('/login', function (req, res) {
  sess = req.session

  models.User.findOne({
    where: {
      username: req.body.username
    }}).then(function (user) {
      if (user.username === req.body.username && user.password === req.body.password) {
        sess.username = user.username
        sess.password = user.password
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

module.exports = router
