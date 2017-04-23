
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
// function createUser(user) {
//     var deferred = q.defer();
//
//     userModel.create({
//         'firstName': user.firstName,
//         'lastName': user.lastName,
//         'email': user.email,
//         'password': user.password,
//         'seller': user.seller
//     }, function(err, user) {
//         if(user) {
//             deferred.resolve(user);
//         }
//     });
//
//     return deferred.promise;
// }
//
// function findUserByCredentials(email, password) {
//     var deferred = q.defer();
//     userModel.findOne({'email': email, 'password': password}, function(err, user) {
//         deferred.resolve(user);
//     });
//     return deferred.promise;
// }
//
// function findUserById(userId) {
//     var deferred = q.defer();
//     userModel.findById(userId, function(err, user) {
//         if(err) { console.log(err)}
//         console.log("findUserByUsername in user model");
//         console.log(user);
//         deferred.resolve(user);
//     });
//     return deferred.promise;
// }
//
// function updateUser(userId, user) {
//     var deferred = q.defer();
//     userModel.update({'_id': userId}, {$set: {
//         'password': user.password,
//         'email': user.email,
//         'firstName': user.firstName,
//         'lastName': user.lastName,
//         'seller': user.seller
//     }
//     }, function(err, user) {
//         deferred.resolve(user);
//     });
//     return deferred.promise;
// }
// //
// // function findUserByUsername(username) {
// //     var deferred = q.defer();
// //     userModel.findOne({'username': username}, function(err, user) {
// //
// //         deferred.resolve(user);
// //     });
// //     return deferred.promise;
// // }
//
//
// //
// // function deleteUser(userId) {
// //     var deferred = q.defer();
// //
// //     userModel.findByIdAndRemove(userId, function(err, user) {
// //         deferred.resolve(user);
// //     });
// //
// //
// //     return deferred.promise;
// // }
//
//
// userModel.createUser = createUser;
// userModel.findUserByCredentials = findUserByCredentials;
// userModel.findUserById = findUserById;
// userModel.updateUser = updateUser;
//
// // userModel.findUserByUsername = findUserByUsername;
// // userModel.deleteUser = deleteUser;



reviewModel.createReview = createReview;
reviewModel.findReviewsByProduct = findReviewsByProduct;
reviewModel.findReviewById = findReviewById;
reviewModel.editReview = editReview;
reviewModel.deleteReview = deleteReview;

module.exports = reviewModel;