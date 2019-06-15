app.get('/', function (req, res) {
    res.sendFile(__dirname + '/test.html')
  })