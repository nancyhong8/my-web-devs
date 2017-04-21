var express = require('express');
var app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping');
//mongoose.connect('mongodb://nancyh:Rewolf123@ds117899.mlab.com:17899/heroku_xn9ljwr0');


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


require("./server/app.server.js")(app);


var port = process.env.PORT || 3500;

app.listen(port);

