module.exports = function() {
    var mongoose = require('mongoose');
    var reviewSchema = new mongoose.Schema(
        {   'rating': String,
            'product': {type: mongoose.Schema.Types.ObjectId, ref:'shoppingProductModel'},
            'reviewer': {type: mongoose.Schema.Types.ObjectId, ref:'shoppingUserModel'},
            'dateCreated': {type: Date, default: Date.now()},
            'seller': {type: String, enum: ['0', '1']}
        }, {collection: 'reviews'}
    );
    return reviewSchema;
}
