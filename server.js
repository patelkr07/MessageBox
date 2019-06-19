require("dotenv").config();

const express = require("express");

var db = require("./models")

const app = express();

const server = require('http').createServer(app);

// const io = require('socket.io')(server);
// // .listen(server);

const PORT = process.env.PORT || 3000;

const connections = [];

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("ListeninG on port %s", PORT);
        console.log("Hey Brandon!")
    });
});


// const db = require("./models");

var twilio = require('twilio');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// Listening on designated port
// server.listen(PORT, function () {
//     console.log('server listening on: ' + PORT);
// });

// Require route files here
require('./routes/htmlroutes')(app);

//Syncing sequelize models and starting express app
// db.sequelize.sync({force: true}).then(function() {
//     app.listen(PORT, function() {
//         console.log("app listending at PORT: " + MessagePort)
//     });
// });

// The foloowing sets up socket.io connection
// io.on('connection', function(socket){
//     connections.push(socket);
//     console.log('Connected: %s sockets connected', connections.length);
//     // socket.on('disconnect', function(){
//     //   console.log('user disconnected');
//     // });
// socket.on('disconnect', function(data) {
//     connections.splice(connections.indexOf(socket), 1);
//     console.log('Disconnected: %s sockets connected', connections.length);
//     })
//   });

// The following is for Whatsapp Twilio API

// var accountSid = 'account sid goes here'; // Your Account SID from www.twilio.com/console
// var authToken = 'Auth token goes here';   // Your Auth Token from www.twilio.com/console

// var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);

// client.messages.create({
//     body: 'Hello from Node',
//     to: '+',  // Text this number
//     from: '+16782938209' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

