
module.exports = function(app) {

    var passport      = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var userModel = require('../models/user.model.js');
    var productModel = require('../models/product.model.js');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#!/user/profile',
            failureRedirect: '/project/index.html#!/user/login'
        }));

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get   ('/api/loggedIn', loggedin);
    app.post  ('/api/logout', logout);
    app.post  ('/api/register', register);
    app.post  ('/api/isAdmin',        isAdmin);
    app.get   ('/api/admin/user', checkAdmin, findAllUsers);
    app.delete('/api/user/admin/:uid', checkAdmin, deleteUser);
    app.delete('/api/user/:uid/delete', checkSameUser, deleteUser);
    app.put   ('/api/admin/user/:uid', checkAdmin, updateUser);
    app.put   ('/api/user/:uid', checkSameUser, updateUser);
    app.get("/api/products", findAllProducts);
    app.get("/api/products/:uid", checkSameUser, findProductsByUser);
    app.put("/api/user/:uid/add-product", checkSameUser, addToCart);
    app.get("/api/user/find/:uid", findUserById);
    app.put("/api/user/message/:uid", sendMessage);
    // app.put("/api/user/remove/cart/:uid", removeFromCart);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || "283364938783133",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || "a915e8a6f8fabec439666a09af4db491",
        //callbackURL  : "http://localhost:3500/auth/facebook/callback"
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3500/auth/facebook/callback"
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                if(user) {
                    return done(null, user);
                }
                else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    }
                    return userModel.createUser(newFacebookUser)
                }
            }, function(error) {
                if(error) {
                    return done(error);
                }
            })
    }


    function localStrategy(username, password, done) {

        userModel.findUserByUsername(username)
            .then(function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            })
    }

    function checkSameUser(req, res, next) {
        if(req.user && req.user._id == req.params['uid']) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    function checkAdmin(req, res, next) {
        if(req.user && req.user.roles.includes('ADMIN')) {
            next();
        }
        else {

            res.sendStatus(401);
        }
    }

    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;

        userModel.updateUser(userId, user)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
                console.log(err);
            })
    }

    function deleteUser(req, res) {
        var uid = req.params['uid'];
        userModel.deleteUser(uid)
            .then(function(response) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404)
                console.log(error);
            })

    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function(users) {
                res.json(users);
            }, function(error) {
                res.sendStatus(401);
            })
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel.findUserByUsername(user.username)
            .then(function(response) {
                if(response) {
                    res.sendStatus(400)
                }
                else {
                    userModel.createUser(user)
                        .then(function(user) {
                            req.login(user, function(error) {
                                if(error) {
                                    res.send(400);
                                }
                                else {
                                    res.send(user);
                                }
                            })
                        }, function (error) {
                            console.log(error);
                            res.sendStatus(400);
                        })
                }

            }, function(error) {
                console.log(error);
            })
    }


    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.roles.includes('ADMIN') ? req.user: '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user: '0');
    }
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function findUserById(req, res) {
        var uid = req.params['uid'];
        userModel.findUserById(uid)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                console.log(err);
            })
    }
    function findAllProducts(req, res) {
        productModel.findAllProducts()
            .then(function(products) {
                res.send(products);
            }, function(err) {
                console.log(err);
            })
    }

    function findProductsByUser(req, res) {
        var userId = req.params['uid'];
        productModel.findProductsByUser(userId)
            .then(function(products) {
                res.send(products);
            }, function(err) {
                console.log(err);
            })
    }

    function addToCart(req, res) {
        var userId = req.params['uid'];
        var product = req.body;
        userModel.addToCart(userId, product)
            .then(function(user) {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(404);
                console.log(err);
            })
    }
    function sendMessage(req, res) {
        var userId = req.params['uid'];
        var message = req.body;
        userModel.sendMessage(userId, message)
            .then(function(user) {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(404);
                console.log(err);
            })
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};

