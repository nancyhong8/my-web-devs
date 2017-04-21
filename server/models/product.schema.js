module.exports = function() {
    var mongoose = require('mongoose');
    var productSchema = new mongoose.Schema({
            'name': String,
            'reviews': [{type: mongoose.Schema.Types.ObjectId, ref:'shoppingReviewModel'}],
            'quantity': Number,
            'seller': {type: mongoose.Schema.Types.ObjectId, ref:'shoppingUserModel'},
            'url': String,
            'description': String,
            'price': {type: Number, default: 0}
        }, {collection: 'products'}
    );
    return productSchema;
}
