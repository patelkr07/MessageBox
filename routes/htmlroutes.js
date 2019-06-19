const path = require('path');
const server = require('../server');


module.exports = function(app) {

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../messagebox.html'))
  });

};






