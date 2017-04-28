
var q = require('q');
var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.js')();
var reviewModel = mongoose.model('shoppingReviewModel', reviewSchema);

function createReview(uid, pid, review) {
    var deferred = q.defer();
    reviewModel.create({
        'product': pid,
        'reviewer': uid,
        'title': review.title,
        'description': review.description,
        'rating': review.rating
    }, function(err, review) {
        if(review) {
            reviewModel.findOne({_id: review._id})
                .populate('reviewer')
                .exec(function(err, review) {
                    if(review) {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
                        console.log(review);
                        deferred.resolve(review);
                    }
                })
        }
    })
    return deferred.promise
}

function findReviewsByProduct(pid) {
    var deferred = q.defer();
    reviewModel.find({'product': pid})
        .populate('reviewer')
        .exec(function(err, review) {
            if(review) {
                deferred.resolve(review);
            }
        })
    return deferred.promise;
}

function findReviewById(rid) {
    var deferred = q.defer();
    reviewModel.findOne({'_id': rid},
        function(err, review) {
            if(review) {
                deferred.resolve(review);
            }
        })
    return deferred.promise;
}

function editReview(rid, review) {
    var deferred = q.defer();
    reviewModel.update({'_id': rid}, {$set: {
        'rating': review.rating,
        'title': review.title,
        'description': review.description
    }}, function(err, review) {
        deferred.resolve(review);
    });
    return deferred.promise;
}

function deleteReview(rid) {
    var deferred = q.defer();
    reviewModel.findByIdAndRemove(rid, function(err, result) {
        deferred.resolve(result);
    });
    return deferred.promise;
}


reviewModel.createReview = createReview;
reviewModel.findReviewsByProduct = findReviewsByProduct;
reviewModel.findReviewById = findReviewById;
reviewModel.editReview = editReview;
reviewModel.deleteReview = deleteReview;

module.exports = reviewModel;