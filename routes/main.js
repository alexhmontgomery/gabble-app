const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const models = require('../models')
// const modelName = require('../models/modelname')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
  secret: 'alexisthegreatest',
  resave: false,
  saveUninitialized: true
}))
router.use(expressValidator())

router.get('/', function (req, res) {
  res.render('index')
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
  res.redirect('/')
})

router.post('/newUser', function (req, res) {
  res.redirect('/signup')
})

module.exports = router
