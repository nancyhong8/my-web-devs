
module.exports = function() {
    var mongoose = require('mongoose');
    var websiteSchema = new mongoose.Schema(
        {   '_userId': [{type: mongoose.Schema.Types.ObjectId, ref: 'webdevSPR17Users'}],
            'name': String,
            'description': String,
            'pages': [{type: mongoose.Schema.Types.ObjectId, ref:'webdevSPR17Pages'}],
            'dateCreated': {type: Date, default: Date.now()}
        }, {collection: 'websites'}
    );



    return websiteSchema;
}


