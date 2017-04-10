module.exports = function() {
    var mongoose = require('mongoose');
    var userSchema = new mongoose.Schema(
        {   'password': String,
            'firstName': String,
            'lastName': String,
            'email': String,
            'seller': {type: String, enum: ['1', '0']},
            'products': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingProductModel'}],
            'dateCreated': {type: Date, default: Date.now()}
        }, {collection: 'users'}
    );
    return userSchema;
}
