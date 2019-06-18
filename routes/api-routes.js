let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
const path = require('path');
const server = require('../server');
const plivoSrc = process.env.PLIVO_SRC;
console.log(plivoSrc);

module.exports=function(app) {
    app.post('/send/message', function (req, res) {
        (function main() {
            'use strict';
        client.messages.create(
            plivoSrc, // src
            "+17133960120", // dst
            "Test Message", // text
        ).then(function (response) {
            console.log(response);
        }, function (err) {
            console.error(err);
        });
        })();
      });
};