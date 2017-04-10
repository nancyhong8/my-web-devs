var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping');


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


require("./server/app.server.js")(app);


var port = process.env.PORT || 3500;

app.listen(port);

