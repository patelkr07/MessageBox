const path = require('path');
const server = require('../server');


module.exports = function(app) {

  app.get('/', function (req, res) {
    res.render('index')
  });

};






