
var q = require('q');
var mongoose = require('mongoose');
var productSchema = require('./product.schema.js')();
var productModel = mongoose.model('shoppingProductModel', productSchema);


function createProduct(product) {
    var deferred = q.defer();

    productModel.create({
        "name": product.name,
        "quantity": product.quantity,
        "desription": product.description,
        "seller": product.seller,
        "url": product.url,
        "sold": "0"
    }, function(err, user) {
        if(user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise;
}

function uploadPicture(product) {

}


function findAllProducts() {
    var deferred = q.defer();
    productModel.find({}, function(err, products) {
        deferred.resolve(products);

    });
    return deferred.promise;
}

function findProductsByUser(userId) {
    var deferred = q.defer();
    productModel.find({'seller': userId}, function(err, products) {
        deferred.resolve(products);
    })
    return deferred.promise;
}

function findProductById(pid) {
    var deferred = q.defer();
    productModel.find({'_id': pid}, function(err, product) {
        deferred.resolve(product);
    })
    return deferred.promise;
}
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

productModel.createProduct = createProduct;
productModel.uploadPicture = uploadPicture;
productModel.findAllProducts = findAllProducts;
productModel.findProductsByUser = findProductsByUser;
productModel.findProductById = findProductById;
module.exports = productModel;