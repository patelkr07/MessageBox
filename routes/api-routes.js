let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
const path = require('path');
const server = require('../server');
const db = require("../models");
var passport = require("../config/passport");
const plivoSrc = process.env.PLIVO_SRC;
console.log(plivoSrc);

const twilioSrc = process.env.TWILIO_SRC;
console.log(process.env.TWILIO_SRC);
var twilio = require('twilio');
var clientTwilio = new twilio(process.env.TWILIO_AUTH_ID,process.env.TWILIO_TOKEN);

module.exports=function(app) {

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json("/members");
    });

    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            res.json({});
        }
        else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
    
    app.post('/send/message', function (plivoData, req, res) {
        // post to mysql
        console.log("db.Post.create: "+ plivoData.body.dst);
        console.log("db: " + db.Posts);
            db.Post.create({
                dst: plivoData.body.dst,
                text: plivoData.body.text
            }).then(function(dbPost) {
                console.log(res);
                console.log(dbPost)
                // getting res.json is a not a function error
                // res.json(dbPost);
            });
        // this portion sends the message via Plivo api
        (function main() {
            'use strict';
            console.log("this is plivoData body.dst: " + plivoData.body.dst);
            //code from Plivio api docs
        client.messages.create(
            plivoSrc, // src
            plivoData.body.dst, // dst
            plivoData.body.text, // text
        ).then(function (response) {
            console.log(response);
        }, function (err) {
            console.error(err);
        });
        })();
    });

      //Plivo recieving messages
    app.all('/receive_sms/', function(request, response) {
        console.log("trying to receive");
        // Sender's phone number
        let from_number = request.body.From || request.query.From;
        // Receiver's phone number - Plivo number
        let to_number = request.body.To || request.query.To;
        // The text which was received
        let text = request.body.Text || request.query.Text;
        console.log('Message received - From: ', from_number, ', To: ', to_number, ', Text: ', text);
        response.send("Message received");
    });

    app.get('/get/messages', function(req, res){
        console.log("trying to get messages from db");
        db.Post.findAll({}).then(function(dbPost) {
            console.log("getting all messages");
            // res.json(dbPost);
        });
    });
// The following sends a message to the designated whatsapp phone number
    app.post('/send/message/whatsapp' , function (twilioData, req, res) {
        console.log("db.Post.create: "+ twilioData.body.dst);
        console.log("db: " + db.Posts);
            db.Post.create({
                dst: twilioData.body.phoneNumber,
                text: twilioData.body.msg
            }).then(function(dbPost) {
                console.log(res);
                console.log(dbPost)
                // getting res.json is a not a function error
                res.json(dbPost);
            });

        (function sendMessage() {
            'use strict';
            console.log('Data:' + twilioData.body);

            // The following is for Whatsapp Twilio API
        clientTwilio.messages.create({
            body: twilioData.body.msg ,
            to: "+1" + twilioData.body.phoneNumber,  // Text this number
            from: twilioSrc  // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));


        })();
      });

    //   Twilio recieving messages
    app.post('/sms', (req, res) => {
        const twiml = new MessagingResponse();

        twiml.message('The Robots are coming! Head for the hills!');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      });
};
