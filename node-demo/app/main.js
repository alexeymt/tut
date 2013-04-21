var express = require('express')
  , ejsLocals = require('ejs-locals')
  , app = express()
  , pages = require(__dirname + '/../controllers/pages')
  , menu = require(__dirname + '/../app/menu')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
//  , ensureLoggedIn = require('ensureLoggedIn')

// configuration settings 
app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/../views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/../public'))
//app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'your secret here'} ));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

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

/*app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });
*/  

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}
  
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});
  
// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
console.log('Authenticate user "'+username+'" with password "'+password+'"')      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));
  
app.get('/account', ensureAuthenticated, function(req, res){
  pages.account(req, res);
});
  
app.get('/login',pages.login);
  //function(req, res) {
  //  res.send('<html><body><a href="/auth/twitter">Sign in with Twitter</a></body></html>');
  //}
  
// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/auth', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = app