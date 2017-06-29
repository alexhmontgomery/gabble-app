const express = require('express')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Server is ON! Go to 0.0.0.0:3000')
})

const main = require('./routes/main')

app.use('/', main)
