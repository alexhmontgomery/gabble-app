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

// middleware for finding user gabs and likes counts
router.use(function (req, res, next) {
  sess = req.session
  models.Gab.findAll({
    where: {
      username: sess.username
    },
    include: [{
      model: models.Like,
      as: 'like'
    }]
  }).then(function (gabs) {
    sess.userGabs = gabs.length
    sess.userLikesRec = 0
    for (var i = 0; i < gabs.length; i++) {
      sess.userLikesRec = sess.userLikesRec + gabs[i].like.length
    }
  })
  models.Like.findAll({
    where: {
      username: sess.username
    }
  }).then(function (likes) {
    sess.userLikesGiv = likes.length
  })
  return next()
})

router.get('/', function (req, res) {
  sess = req.session
  if (sess.username) {
    models.Gab.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: models.Like,
        as: 'like'
      }]
    }).then(function (gabs) {
      for (var i = 0; i < gabs.length; i++) {
        if (gabs[i].username === sess.username) {
          gabs[i].showDelete = true
        }
        for (var k = 0; k < gabs[i].like.length; k++) {
          if (gabs[i].like[k].username === sess.username) {
            gabs[i].hideLike = true
          }
        }
      }
      console.log(gabs[0])
      return res.render('feed', {
        user: sess.username,
        gabs: gabs,
        userGabs: sess.userGabs,
        userLikesRec: sess.userLikesRec,
        userLikesGiv: sess.userLikesGiv
      })
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

router.get('/newgab', function (req, res) {
  sess = req.session
  console.log(req.session.username)
  res.render('gabcreate')
})

router.get('/gab/:id', function (req, res) {
  sess = req.session
  models.Gab.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: models.Like,
      as: 'like'
    }]
  }).then(function (gab) {
    return res.render('gabdisplay', {
      user: sess.username,
      gab: gab
    })
  })
})

router.get('/logout', function (req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''
  res.redirect('/')
})

router.get('/profile/:user', function (req, res) {
  sess = req.session
  models.Gab.findAll({
    where: {
      username: req.params.user
    },
    order: [['createdAt', 'DESC']],
    include: [{
      model: models.Like,
      as: 'like'
    }]
  }).then(function (gabs) {
    res.render('profile', {
      user: sess.username,
      gabs: gabs
    })
  })
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
    console.log('Passwords do not match')
    return res.render('signup')
  }
})

router.post('/createAGab', function (req, res) {
  res.redirect('/newgab')
})

router.post('/like', function (req, res) {
  sess = req.session
  const like = models.Like.build({
    username: sess.username,
    gabId: req.body.gabnum
  })
  like.save()
    .then(function () {
      return res.redirect('/')
    })
})

router.post('/gabSubmit', function (req, res) {
  sess = req.session
  const gab = models.Gab.build({
    username: sess.username,
    content: req.body.content
  })
  gab.save()
    .then(function () {
      return res.redirect('/')
    })
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
