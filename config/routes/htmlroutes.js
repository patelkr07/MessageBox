app.get('/', function (req, res) {
    res.sendFile(__dirname + '../public/messagebox.html')
  });