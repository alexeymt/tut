var express = require('express')
  , ejsLocals = require('ejs-locals')
  , app = express()
  , pages = require(__dirname + '/../controllers/pages')
  , menu = require(__dirname + '/../app/menu')

// configuration settings 
app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/../views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/../public'))

// set view locals
app.use(function (req, res, next) {
  app.locals.route = req.url
  app.locals.menu = menu
  next()
})

// mount routes
app.get('/', function (req, res) { res.redirect('home') })
app.get('/home', pages.home)
app.get('/about', pages.about)

module.exports = app