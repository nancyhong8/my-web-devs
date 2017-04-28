
module.exports = function(app) {

    app.post("/api/user/:uid/product/:pid/review", createReview);
    app.get("/api/product/:pid/reviews", findReviewsByProduct);
    app.get("/api/review/:rid", findReviewById);
    app.put("/api/review/:rid", editReview);
    app.delete("/api/review/:rid", deleteReview);

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

};

