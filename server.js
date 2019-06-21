require("dotenv").config();

const http = require('http');
const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
const router = express.Router();
const server = require('http').createServer(app);

// const io = require('socket.io')(server);
// // .listen(server);



const PORT = process.env.PORT || 5000;

const connections = [];
const db = require("./models");

// var twilio = require('twilio');

let plivo = require('plivo');
let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port',(process.env.PORT || 5000));
app.use(express.static("public"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Require route files here
require('./routes/htmlroutes')(app);
require('./routes/api-routes')(app);
// const routes = require('./routes/api-routes');
// app.use(routes);

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


// router.get("/", function(req, res) {
//     messages.all(function(data) {
//         const hbsObject = {
//             messages: data,
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

// app.listen(app.get('port'), function() {
//     console.log('Plivo Node app is running on port', app.get('port'));
// });
            
// Twilio recieve messages listener
// http.createServer(app).listen(PORT, () => {
//     console.log('Express server listening on port:' + PORT);
//   });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("ListeninG on port %s", PORT);
        console.log("Hey Brandon!")
    });
});
        
