const express = require('express')
const mustache = require('mustache-express')
const app = express()
const session = require('express-session')
const loginRoutes = require('./routes/login.js')
const userRoutes = require('./routes/user.js')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Server is ON! Go to 0.0.0.0:3000')
})

app.use(session({
  secret: 'alexisthegreatest',
  resave: false,
  saveUninitialized: true
}))

app.use('/', loginRoutes)
app.use('/', userRoutes)
