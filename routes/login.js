const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const models = require('../models')

var sess

router.use(bodyParser.urlencoded({ extended: false }))
router.use(expressValidator())

router.use(function (req, res, next) {
  sess = req.session
  if (req.session.loginError) {
    next()
  } else {
    req.session.loginError = ''
    next()
  }
})

router.get('/login', function (req, res) {
  sess = req.session
  res.render('login', {
    loginError: sess.loginError
  })
})

router.get('/signup', function (req, res) {
  res.render('signup')
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
      .catch(function (error) {
        res.render('signup', {
          errors: error.errors,
          user: user
        })
      })
  } else {
    let signUpError = 'Passwords do not match'
    return res.render('signup', {
      signUpError: signUpError
    })
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
        return res.redirect('/')
      } else if (user.username === req.body.username && user.password !== req.body.password) {
        sess.loginError = 'Password was not correct'
        return res.redirect('/login')
      }
    })
    .catch(function (error) {
      sess.loginError = 'Username was not found'
      res.redirect('/login')
    })
})

router.post('/newUser', function (req, res) {
  res.redirect('/signup')
})

module.exports = router
