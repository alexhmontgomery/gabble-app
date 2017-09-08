const express = require('express')
const mustache = require('mustache-express')
const app = express()
const session = require('express-session')
const loginRoutes = require('./routes/login.js')
const userRoutes = require('./routes/user.js')
const config = require('./config/main')
var pg = require('pg')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static('public'))

// pg.defaults.ssl = true
// pg.connect(process.env.DATABASE_URL, function (err, client) {
//   if (err) throw err
//   console.log('Connected to postgres! Getting schemas...')
//
//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function (row) {
//       console.log(JSON.stringify(row))
//     })
// })

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server is ON! Go to host:port:' + port)
})

app.use(session({
  secret: 'alexisthegreatest',
  resave: false,
  saveUninitialized: true
}))

app.use('/', loginRoutes)
app.use('/', userRoutes)
