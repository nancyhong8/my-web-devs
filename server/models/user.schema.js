module.exports = function() {
    var mongoose = require('mongoose');
    var userSchema = new mongoose.Schema(
        {   'username': String,
            'password': String,
            'firstName': String,
            'lastName': String,
            'email': String,
            'roles': [{type: String, enum: ['ADMIN', 'SELLER']}],
            'address': String,
            'productSelling': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingProductModel'}],
            'productBought': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingProductModel'}],
            'cart': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingProductModel'}],
            'inbox': [ {
                message: String,
                from: {type: mongoose.Schema.Types.ObjectId, ref:'shoppingUserModel'}
            }],
            'description': String,
            'facebook': {
                id: String,
                token: String
            }
        }, {collection: 'users'}
    );
    return userSchema;
}
