
// module.exports = function() {
    var q = require('q');
    var mongoose = require('mongoose');

    var userSchema = require('./user.schema.server.js')();
    var userModel = mongoose.model('webdevSPR17Users', userSchema);
    // var deferred = q.defer();

    // var api = {
    //     "createUser": createUser,
    //     "findUserById": findUserById,
    //     "findUserByUsername": findUserByUsername,
    //     "findUserByCredentials": findUserByCredentials,
    //     "updateUser": updateUser,
    //     "deleteUser": deleteUser
    // };
    // return api;

    function createUser(user) {
        var deferred = q.defer();

        userModel.create({'username': user.username, 'password': user.password}, function(err, user) {
            if(user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        console.log("findUserById Id: ");
        console.log(userId);
        userModel.findById(userId, function(err, user) {
            if(err) { console.log(err)}
            console.log("findUserByUsername in user model");
            console.log(user);
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({'username': username}, function(err, user) {

            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({'username': username, 'password': password}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update({'_id': userId}, {$set: {
            'username': user.username,
            'email': user.email,
            'firstName': user.firstName,
            'lastName': user.lastName
        }
        }, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        userModel.findByIdAndRemove(userId, function(err, user) {
            deferred.resolve(user);
        });


        return deferred.promise;
    }

// return userModel;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;


module.exports = userModel;

// return userModel;

