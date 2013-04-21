exports.home = function (req, res) {
  res.render('pages/home', {
      title: 'Home page'
    , message: 'This is the "home" action of "pages" controller'
  })
}
exports.about = function (req, res) {
  res.render('pages/about', {
      title: 'About page'
    , message: 'This is the "about" action of "pages" controller'
  })
}
exports.account = function (req, res) {
  res.render('pages/account', {
      title: 'Account'
    , message: req.user
  })
}
exports.login = function (req, res) {
  res.render('pages/login', {
      title: 'Login'
  })
}

