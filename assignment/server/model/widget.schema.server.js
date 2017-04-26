
module.exports = function() {
    var mongoose = require('mongoose');
    var widgetSchema = new mongoose.Schema(
        {   '_page': [{type: mongoose.Schema.Types.ObjectId, ref:'webdevSPR17Pages'}],
            'type': {type: String, enum: ['HTML', 'INPUT', 'IMAGE', 'HEADER', 'YOUTUBE']},
            'name': String,
            'text': String,
            'placeholder': String,
            'description': String,
            'url': String,
            'width': String,
            'height': String,
            'rows': Number,
            'size': Number,
            'class': String,
            'icon': String,
            'deletable': Boolean,
            'formatted': Boolean,
            'dateCreated': [{type: Date, default: Date.now()}]
        }, {collection: 'widgets'}
    );
    return widgetSchema;

}


