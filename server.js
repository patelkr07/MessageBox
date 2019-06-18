require("dotenv").config();

const express = require("express");

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);
// .listen(server);

const PORT = process.env.PORT || 3000;

const connections = [];

const db = require("./models");

var twilio = require('twilio');

let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// Require route files here
require('./routes/htmlroutes')(app);

//Syncing sequelize models and starting express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("app listening at PORT %s: " + PORT)
    });
});

// The foloowing sets up socket.io connection
io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
    })
  });

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

    $(document).ready(function() {
        $('#clockwork').click(function() {
            (function main() {
                'use strict';
            client.messages.create(
                "+14843093891", // src
                "+17133960120", // dst
                "Test Message", // text
            ).then(function (response) {
                console.log(response);
            }, function (err) {
                console.error(err);
            });
            })();
        })
    })
        
