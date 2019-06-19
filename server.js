require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');

var db = require("./models")

const app = express();

const server = require('http').createServer(app);

// const io = require('socket.io')(server);
// // .listen(server);



const PORT = process.env.PORT || 5000;

const connections = [];

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("ListeninG on port %s", PORT);
        console.log("Hey Brandon!")
    });
});


// const db = require("./models");

// var twilio = require('twilio');

let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port',(process.env.PORT || 5000));
app.use(express.static("public"));

// Listening on designated port
// server.listen(PORT, function () {
//     console.log('server listening on: ' + PORT);
// });

// Require route files here
require('./routes/htmlroutes')(app);
require('./routes/api-routes')(app);

//Syncing sequelize models and starting express app
// db.sequelize.sync().then(function() {
//     app.listen(PORT, function() {
//         console.log("app listening at PORT %s: " + PORT)
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


app.listen(app.get('port'), function() {
    console.log('Plivo Node app is running on port', app.get('port'));
});
            

        
