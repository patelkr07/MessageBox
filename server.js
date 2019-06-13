require("dotenv").config();

const express = require("express");

const app = express();

const db = require("./models");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// Require route files here


//Syncing sequelize models and starting express app
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("app listending at PORT: " + MessagePort)
    });
});
