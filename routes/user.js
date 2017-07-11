const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const models = require('../models')
var sess

router.use(bodyParser.urlencoded({ extended: false }))
router.use(expressValidator())

router.use(function (req, res, next) {
  if (req.session.username) {
    next()
  } else {
    res.redirect('/login')
  }
})

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
  // if (sess.username) {
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
    return res.render('feed', {
      user: sess.username,
      gabs: gabs,
      userGabs: sess.userGabs,
      userLikesRec: sess.userLikesRec,
      userLikesGiv: sess.userLikesGiv
    })
  })
  // } else {
  //   return res.redirect('/login')
  // }
})

router.get('/newgab', function (req, res) {
  sess = req.session
  res.render('gabcreate', {
    user: sess.username
  })
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
    if (gab.username === sess.username) {
      gab.showDelete = true
    }
    for (var k = 0; k < gab.like.length; k++) {
      if (gab.like[k].username === sess.username) {
        gab.hideLike = true
      }
    }

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
  sess.loginError = ''
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
    const profLength = gabs.length
    let profName = gabs[0].username
    if (profName === sess.username) {
      profName = 'Your'
    }
    let profLikesRec = 0
    for (var i = 0; i < gabs.length; i++) {
      profLikesRec = profLikesRec + gabs[i].like.length
    }
    for (var g = 0; g < gabs.length; g++) {
      if (gabs[g].username === sess.username) {
        gabs[g].showDelete = true
      }
      for (var k = 0; k < gabs[g].like.length; k++) {
        if (gabs[g].like[k].username === sess.username) {
          gabs[g].hideLike = true
        }
      }
    }
    res.render('profile', {
      user: sess.username,
      gabs: gabs,
      profLength: profLength,
      profLikesRec: profLikesRec,
      profName: profName
    })
  })
  .catch(function (errors) {
    res.render('profile', {
      user: sess.username,
      profLength: 0,
      profLikesRec: 0,
      profName: req.params.user
    })
  })
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

router.post('/delete', function (req, res) {
  models.Like.destroy({
    where: {
      gabId: req.body.gabnum
    }
  }).then(function () {
    models.Gab.destroy({
      where: {
        id: req.body.gabnum
      }
    }).then(function () {
      res.redirect('/')
    })
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
    .catch(function (error) {
      res.render('gabcreate', {
        errors: error.errors,
        content: req.body.content,
        user: sess.username
      })
    })
})

module.exports = router
