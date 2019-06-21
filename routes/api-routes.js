let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
const path = require('path');
const server = require('../server');
const db = require("../models")
const plivoSrc = process.env.PLIVO_SRC;
console.log(plivoSrc);


module.exports=function(app) {
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
                res.json(dbPost);
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

    app.get('get/messages', function(req, res){
        console.log("trying to get messages from db");
        db.Post.findAll({}).then(function(dbPost) {
            console.log("getting all messages");
            res.json(dbPost);
        });
    });

};