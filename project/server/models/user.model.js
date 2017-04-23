
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
        'roles': user.roles,
        'description': user.description
    }, function(err, user) {
        if(user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise;
}


// function findUserByCredentials(username, password) {
//     var deferred = q.defer();
//     userModel.findOne({'username': username, 'password': password}, function(err, user) {
//         deferred.resolve(user);
//     });
//     return deferred.promise;
// }

function findUserById(userId) {
    var deferred = q.defer();
    userModel.findById(userId, function(err, user) {
    })
        .populate('cart')
        .populate('productBought')
        .populate('productSelling')
        .populate('inbox.from')
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
        'cart': user.cart,
        'productBought': user.productBought,
        'productSelling': user.productSelling,
        'username': user.username,
        'password': user.password,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'roles': user.roles,
        'description': user.description,
        'inbox': user.inbox
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
function addToProductSelling(uid, product) {
    var deferred = q.defer();
    userModel.findByIdAndUpdate(uid,
        {$push: {"productSelling": product._id}},
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


function deleteUser(uid) {
    var deferred = q.defer();
    userModel.findByIdAndRemove(uid, function(err, user) {
        if(user) {
            deferred.resolve(user);
        }
        else {
            console.log(err);
        }
    });
    return deferred.promise;
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByUsername(username) {
    var deferred = q.defer();
    userModel.findOne({"username": username},
        function(err, user) {
            if(user) {
                deferred.resolve(user);
            }
            else {
                deferred.resolve(err);
            }
        }
    )
    return deferred.promise
}

function sendMessage(userId, message) {
    var deferred = q.defer();
    userModel.findByIdAndUpdate(userId,
        {$push: {"inbox": message}},
        {safe: true, upsert: true, new : true},
        function(err, result) {
            if(result) {
                deferred.resolve(result);
            }
        })

    return deferred.promise;
}

userModel.createUser = createUser;
// userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.addToCart = addToCart;
// userModel.removeFromCart = removeFromCart;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;
userModel.addToProductSelling = addToProductSelling;
userModel.sendMessage = sendMessage;
// userModel.findUserByUsername = findUserByUsername;


module.exports = userModel;