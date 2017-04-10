module.exports = function() {
    var mongoose = require('mongoose');
    var productSchema = new mongoose.Schema(
        {   'name': String,
            'reviews': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingReviewModel'}],
            'dateCreated': {type: Date, default: Date.now()},
            'quantity': Number,
            'sold': {type: String, enum: ['0', '1']},
            'seller': {type: mongoose.Schema.Types.ObjectId, ref:'shoppingUserModel'},
            'url': String,
            'description': String
        }, {collection: 'products'}
    );
    return productSchema;
}
