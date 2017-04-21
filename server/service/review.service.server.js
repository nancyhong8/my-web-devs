
module.exports = function(app) {

    app.post("/api/user/:uid/product/:pid/review", createReview);
    app.get("/api/product/:pid/reviews", findReviewsByProduct);
    app.get("/api/review/:rid", findReviewById);
    app.put("/api/review/:rid", editReview);
    app.delete("/api/review/:rid", deleteReview);
    // app.post("/api/user", createUser);
    // app.get("/api/user", findUserByCredentials);
    // app.get("/api/user/:uid", findUserById);
    // app.put("/api/user/:uid", updateUser);
    // // app.delete("/api/user/:uid", deleteUser);

    var reviewModel = require('../models/review.model.js');
    var productModel = require('../models/product.model.js');

    function createReview(req, res) {
        var review = req.body;
        var pid = req.params['pid'];
        var uid = req.params['uid'];
        reviewModel.createReview(uid, pid, review)
            .then(function(result) {
                productModel.addReviewToProduct(pid, result);
                res.send(result);
            }, function(error) {
                console.log(err);
            })
    }

    function findReviewsByProduct(req, res) {
        var pid = req.params['pid'];
        reviewModel.findReviewsByProduct(pid)
            .then(function(result) {
                res.send(result);
            }, function(error) {
                console.log(err);
            })
    }

    function findReviewById(req, res) {
        var rid = req.params['rid'];
        reviewModel.findReviewById(rid)
            .then(function(review) {
                res.send(review);
            }, function(error) {
                console.log(error);
            })
    }

    function editReview(req, res) {
        var rid = req.params['rid'];
        var review = req.body;
        reviewModel.editReview(rid, review)
            .then(function(review) {
                res.send(review);
            }, function(error) {
                console.log(error);
            })
    }

    function deleteReview(req, res) {
        var rid = req.params['rid'];
        reviewModel.deleteReview(rid)
            .then(function(result) {
                res.sendStatus(200);
            }, function(error) {
                console.log(error);
            })
    }

    // function findUserByCredentials(req, res) {
    //     var email = req.query.email;
    //     var password = req.query.password;
    //
    //     userModel.findUserByCredentials(email, password)
    //         .then(function(user) {
    //             if(user) {
    //                 res.send(user);
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         },function(err) {
    //             res.sendStatus(500);
    //         })
    // }
    //
    // function findUserById(req, res) {
    //     var userId = req.params['uid'];
    //     userModel.findUserById(userId)
    //         .then(function(user) {
    //             res.send(user);
    //         }),function(err) {
    //         console.log(err);
    //     }
    // }
    //
    // function updateUser(req, res) {
    //     var userId = req.params['uid'];
    //     var user = req.body;
    //
    //     userModel.updateUser(userId, user)
    //         .then(function (user) {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             console.log(err);
    //         })
    // }

    // function findUserByCredentials(req, res) {
    //     var username = req.query.username;
    //     var password = req.query.password;
    //
    //     userModel.findUserByCredentials(username, password)
    //         .then(function (user) {
    //             if (user) {
    //                 res.send(user);
    //             } else {
    //                 res.sendStatus(404);
    //             }
    //         }, function (err) {
    //             res.sendStatus(500);
    //         })
    // }



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

