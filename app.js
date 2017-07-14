const express = require('express')
const mustache = require('mustache-express')
const Router = require('./routes/router')
const bodyParser = require('body-parser')
const fs = require('fs')

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const app = express()

app.engine('mustache', mustache())
app.set('views', './views')
app.set('view engine', 'mustache' )
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', Router)

app.listen(3000, function(req, res) {
  console.log('Work work work');
})
