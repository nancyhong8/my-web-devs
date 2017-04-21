
var q = require('q');
var mongoose = require('mongoose');
var productSchema = require('./product.schema.js')();
var productModel = mongoose.model('shoppingProductModel', productSchema);


function createProduct(product) {
    var deferred = q.defer();

    productModel.create(
        product
    , function(err, user) {
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
    productModel.find({})
        .populate('reviews')
        .exec(function(error, product) {
            if(product) {
                deferred.resolve(product);
            }
        })
    return deferred.promise
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
    productModel.findOne({'_id': pid})
        .populate('reviews')
        .exec(function(error, product) {
            if(product) {
                deferred.resolve(product);
            }
        })
    return deferred.promise;
}

function addReviewToProduct(pid, review) {
    productModel.findOneAndUpdate({'_id':pid},
        {$push: {"reviews": {_id: review._id}}},
        {safe: true, upsert: true, new : true},
        function(err, result) {
        });
}


function editProduct(product) {
    console.log(product);
    var deferred = q.defer();
    productModel.update({'_id': product._id}, {$set: {
        'name': product.name,
        'description': product.description,
        'quantity': product.quantity,
        'price': product.price,
        'url': product.url
    }}, function(err, product) {
        deferred.resolve(product);
    });
    return deferred.promise;
}


function deleteProduct(pid) {
    var deferred = q.defer();

    productModel.findByIdAndRemove(pid, function(err, product) {
        deferred.resolve(product);
    });

    return deferred.promise;
}


productModel.createProduct = createProduct;
productModel.uploadPicture = uploadPicture;
productModel.findAllProducts = findAllProducts;
productModel.findProductsByUser = findProductsByUser;
productModel.findProductById = findProductById;
productModel.addReviewToProduct = addReviewToProduct;
productModel.editProduct = editProduct;
productModel.deleteProduct = deleteProduct;

module.exports = productModel;