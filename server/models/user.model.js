
var q = require('q');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.js')();
var userModel = mongoose.model('shoppingUserModel', userSchema);


function createUser(user) {
    var deferred = q.defer();

    userModel.create({
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'password': user.password,
        'seller': user.seller
    }, function(err, user) {
        if(user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise;
}

function findUserByCredentials(email, password) {
    var deferred = q.defer();
    userModel.findOne({'email': email, 'password': password}, function(err, user) {
        deferred.resolve(user);
    });
    return deferred.promise;
}

function findUserById(userId) {
    var deferred = q.defer();
    userModel.findById(userId, function(err, user) {
        if(err) {
            console.log(err)
        }
        console.log(user);
        deferred.resolve(user);
    });
    return deferred.promise;
}

function updateUser(userId, user) {
    var deferred = q.defer();
    userModel.update({'_id': userId}, {$set: {
        'password': user.password,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'seller': user.seller
    }
    }, function(err, user) {
        deferred.resolve(user);
    });
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


//
// function deleteUser(userId) {
//     var deferred = q.defer();
//
//     userModel.findByIdAndRemove(userId, function(err, user) {
//         deferred.resolve(user);
//     });
//
//
//     return deferred.promise;
// }


userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;

// userModel.findUserByUsername = findUserByUsername;
// userModel.deleteUser = deleteUser;


module.exports = userModel;