
var q = require('q');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.js')();
var userModel = mongoose.model('shoppingUserModel', userSchema);



function createUser(user) {
    var deferred = q.defer();

    userModel.create({
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'password': user.password,
        'roles': user.roles
    }, function(err, user) {
        if(user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise;
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByCredentials(username, password) {
    var deferred = q.defer();
    userModel.findOne({'username': username, 'password': password}, function(err, user) {
        deferred.resolve(user);
    });
    return deferred.promise;
}

function findUserById(userId) {
    var deferred = q.defer();
    userModel.findById(userId, function(err, user) {
    })
        .populate('cart')
        .exec(function(error, user) {
        if(user) {
            deferred.resolve(user);
        }
    })
    return deferred.promise;
}

function updateUser(userId, user) {
    var deferred = q.defer();
    userModel.update({'_id': userId}, {$set: {
        'username': user.username,
        'password': user.password,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'roles': user.roles
    }}, function(err, user) {
        deferred.resolve(user);
    });
    return deferred.promise;
}

function addToCart(userId, product) {
    var deferred = q.defer();
    userModel.findByIdAndUpdate(userId,
        {$push: {"cart": {_id: product._id}}},
        {safe: true, upsert: true, new : true},
        function(err, result) {
            if(result) {
                deferred.resolve(result);
            }
        })

    return deferred.promise;
}

function removeFromCart(uid, product) {
    var deferred = q.defer();
    userModel.findByIdAndUpdate(uid,
        {$pull: {"cart": product._id}},
        {safe: true, upsert: true, new: true},
        function(err, result) {
            if(result) {
                deferred.resolve(result);
            }
        }
    )
    return deferred.promise;
}

function findAllUsers() {
    var deferred = q.defer();
    userModel.find({}, function(err, users) {
        if(users) {
            deferred.resolve(users);
        }
    })
    return deferred.promise;
}


//
// function findUserByUsername(username) {
//     var deferred = q.defer();
//     userModel.findOne({'username': username}, function(err, user) {
//
//         deferred.resolve(user);
//     });
//     return deferred.promise;
// }



function deleteUser(uid) {
    var deferred = q.defer();

    userModel.findByIdAndRemove(uid, function(err, user) {
        deferred.resolve(user);
    });
    return deferred.promise;
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.addToCart = addToCart;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.removeFromCart = removeFromCart;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;
// userModel.findUserByUsername = findUserByUsername;
// userModel.deleteUser = deleteUser;


module.exports = userModel;