const path = require('path');
const server = require('../server');



var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.render(path.join(__dirname, "../views/index"));
  });

  app.get('/members', function (req, res) {
    res.render('index')
  });

  app.get('/get/messages', function (req, res) {
    res.render('index')
  });

};






