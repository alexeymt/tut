var app = require(__dirname + '/app')
  , port = process.env.PORT || 3000
  , host = process.env.IP;

app.listen(port, host, function () {
  console.log('Listening on port ', port)
})
