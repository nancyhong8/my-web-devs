
module.exports = function(app) {

    var passport      = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var userModel = require('../models/user.model.js');
    var productModel = require('../models/product.model.js');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;


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
    app.put("/api/user/remove/cart/:uid", removeFromCart);

    // app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    //
    // app.get('/auth/google/callback',
    //     passport.authenticate('google', {
    //         successRedirect: '/#/user/profile',
    //         failureRedirect: '/#/user/login'
    //     }));


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // var googleConfig = {
    //     clientID     : process.env.GOOGLE_CLIENT_ID_SPRING_2017,
    //     clientSecret : process.env.GOOGLE_CLIENT_SECRET_SPRING_2017,
    //     callbackURL  : process.env.GOOGLE_CALLBACK_URL_SPRING_2017
    // };

    // passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    // function googleStrategy(token, refreshToken, profile, done) {
    //     userModel
    //         .findUserByGoogleId(profile.id)
    //         .then(
    //             function(user) {
    //                 if(user) {
    //                     return done(null, user);
    //                 } else {
    //                     var email = profile.emails[0].value;
    //                     var emailParts = email.split("@");
    //                     var newGoogleUser = {
    //                         username:  emailParts[0],
    //                         firstName: profile.name.givenName,
    //                         lastName:  profile.name.familyName,
    //                         email:     email,
    //                         google: {
    //                             id:    profile.id,
    //                             token: token
    //                         }
    //                     };
    //                     return userModel.createUser(newGoogleUser);
    //                 }
    //             },
    //             function(err) {
    //                 if (err) { return done(err); }
    //             }
    //         )
    //         .then(
    //             function(user){
    //                 return done(null, user);
    //             },
    //             function(err){
    //                 if (err) { return done(err); }
    //             }
    //         );
    // }


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

        // user.password = bcrypt.hashSync(user.password);
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


    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.roles.includes('ADMIN') ? req.user: '0');
    }

    function login(req, res) {

        // userModel.findUserByUsername(username)
        //     .then(function(user) {
        //         if(user && bcrypt.compareSync(password, user.password)) {
        //             return done(null, user);
        //         }
        //         else {
        //             return done(null, false);
        //         }
        //     })
        var user = req.user;
        console.log('reached user from login');
        console.log(user);
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

    function removeFromCart(req, res) {
        var uid = req.params['uid'];
        var product = req.body;
        userModel.removeFromCart(uid, product)
            .then(function(result) {
                res.sendStatus(200);
            }, function(error) {
                res.sendStatus(404);
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

