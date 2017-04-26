
module.exports = function() {
    var mongoose = require('mongoose');
    var pageSchema = new mongoose.Schema(
        {   '_website': [{type: mongoose.Schema.Types.ObjectId, ref:'webdevSPR17Websites'}],
            'name': String,
            'title': String,
            'description': String,
            'widgets': [{type: mongoose.Schema.Types.ObjectId, ref:'webdevSPR17Widgets'}],
            'dateCreated': [{type: Date, default: Date.now()}]
        }, {collection: 'pages'}
    );
    return pageSchema;

}


