var app = require(__dirname + '/app')
  , port = process.env.PORT || 3000
  , host = process.env.IP;

app.listen(port, host, function () {
  console.log('Listening on port ', port)
})


/**
 * Module dependencies.
 */
/*var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
//app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('host', process.env.IP);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
//}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), app.get('host'),
  function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
*/