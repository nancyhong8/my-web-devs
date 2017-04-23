module.exports = function() {
    var mongoose = require('mongoose');
    var reviewSchema = new mongoose.Schema(
        {   'product': {type: mongoose.Schema.Types.ObjectId, ref: 'shoppingProductModel'},
            'rating': {type: String, enum: [1, 2, 3, 4, 5]},
            'title': String,
            'reviewer': {type: mongoose.Schema.Types.ObjectId, ref:'shoppingUserModel'},
            'description': String
        }, {collection: 'reviews'}
    );
    return reviewSchema;
}
