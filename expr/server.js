var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000
  , host = process.env.IP;

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.listen(port, host, function () {
  console.log('Listening on port ', port)
})