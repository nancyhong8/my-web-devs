
module.exports = function() {
    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/web-dev');
    var userSchema = new mongoose.Schema(
        {   'username': String,
            'password': String,
            'firstName': String,
            'lastName': String,
            'email': String,
            'phone': String,
            'websites': [{type: mongoose.Schema.Types.ObjectId, ref:'webdevSPR17Websites'}],
            'dateCreated': [{type: Date, default: Date.now()}]
        }, {collection: 'users'}
    );
    return userSchema;

}


