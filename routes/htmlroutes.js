const path = require('path');

module.exports = function(app) {


  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/./public/messagebox.html')
  })
};

