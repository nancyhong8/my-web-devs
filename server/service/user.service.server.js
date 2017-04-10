
module.exports = function(app) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.get("/api/products", findAllProducts);
    app.get("/api/products/:uid", findProductsByUser);
    // app.delete("/api/user/:uid", deleteUser);

    var userModel = require('../models/user.model.js');
    var productModel = require('../models/product.model.js');

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(function(user) {
                res.send(user);
            }),function(err) {
            console.log(err);
        }
    }

    function findUserByCredentials(req, res) {
        var email = req.query.email;
        var password = req.query.password;

        userModel.findUserByCredentials(email, password)
            .then(function(user) {
                if(user) {
                    res.send(user);
                }
                else {
                    res.sendStatus(404);
                }
            },function(err) {
                res.sendStatus(500);
            })
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel.findUserById(userId)
            .then(function(user) {
                res.send(user);
            }),function(err) {
            console.log(err);
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







    // function deleteUser(req, res) {
    //     var userId = req.params['uid'];
    //
    //     userModel.deleteUser(userId)
    //         .then(function (user) {
    //             res.send(200);
    //         }), function (err) {
    //         console.log(err);
    //     }
    // }
};

