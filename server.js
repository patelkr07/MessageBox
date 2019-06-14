require("dotenv").config();

const express = require("express");

const app = express();

// const db = require("./models");

var twilio = require('twilio');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// Require route files here


//Syncing sequelize models and starting express app
// db.sequelize.sync({force: true}).then(function() {
//     app.listen(PORT, function() {
//         console.log("app listending at PORT: " + MessagePort)
//     });
// });


// The following is for Whatsapp Twilio API

var accountSid = 'account sid goes here'; // Your Account SID from www.twilio.com/console
var authToken = 'Auth token goes here';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+',  // Text this number
    from: '+16782938209' // From a valid Twilio number
})
.then((message) => console.log(message.sid));