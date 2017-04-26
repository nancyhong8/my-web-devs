

var q = require('q');
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js')();
var widgetModel = mongoose.model('webdevSPR17Widgets', widgetSchema);
var pageModel = require('./page.model.server.js');


function createWidget(pageId, widget) {
    var deferred = q.defer();
    widgetModel.create(widget, function(err, widget) {
        if(widget) {
            deferred.resolve(widget);
            pageModel.findByIdAndUpdate(pageId,
                {$push: {"widgets": {_id: widget._id}}},
                {safe: true, upsert: true, new : true},
                function(err, result) {
                    console.log(err);
                    console.log("createWidget model result after finding page");
                    console.log(result);
                })

        }
    })

    return deferred.promise;
}

function findAllWidgetsForPage(pageId) {
    var deferred = q.defer();

    widgetModel.find({_page: pageId}, function(err, widget) {
        deferred.resolve(widget);
    });
    return deferred.promise;
}



function findWidgetById(widgetId) {
    var deferred = q.defer();

    widgetModel.findById(widgetId, function(err, widget) {
        deferred.resolve(widget);
    });
    return deferred.promise;
}

// TODO perhaps return the widget and have create defer it
function updateWidget(widgetId, widget) {
    console.log("update Widget model");
    console.log(widgetId);
    console.log(widget);

    var deferred = q.defer();

    if(widget.type == 'HEADER') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'size': widget.size
        }}, function(err, widget) {

            deferred.resolve(widget);
        })
    }

    else if(widget.type == 'IMAGE') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'url': widget.url,
            'width': widget.width
        }}, function(err, widget) {
            deferred.resolve(widget);
        });
    }
    else if(widget.type == 'YOUTUBE') {
        widgetModel.update({'_id': widgetId}, {$set: {
            'name': widget.name,
            'text': widget.text,
            'url': widget.url,
            'width': widget.width,
        }}, function(err, widget) {

            deferred.resolve(widget);
        });
    }
    else if(widget.type == 'HTML') {
        widgetModel.update({'_id': widgetId}, {$set: {

        }}, function(err, widget) {
            deferred.resolve(widget);
        });
    }
    return deferred.promise;
}

function deleteWidget(widgetId) {
    var deferred = q.defer();

    widgetModel.findByIdAndRemove(widgetId, function(err, widget) {
        console.log(widget);
        console.log("widget page id from delete widget");
            pageId = widget._page;
            pageModel.findPageById(pageId)
                .then(function (page) {
                    page.widgets.splice(page.widgets.indexOf(widgetId), 1);
                    page.save(function (response) {
                        deferred.resolve(response);
                    });
                },function(err) {
                    console.log(err);
                })


    });

    return deferred.promise;
}


function reorderWidget(pageId, start, end) {
    var deferred = q.defer();
    console.log("reoder from model");
    console.log("pageId: " + pageId + "start" + start + "end: " + end);
    pageModel.findPageById(pageId)
        .then(function (page) {
            console.log("page from reodrewidget model");
            console.log(page);
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            page.markModified('widgets');
            page.save(function(response) {
                console.log("saved reordered wigdet from model");
                deferred.resolve(response);
            });
        });
    return deferred.promise;

}

// reorderWidget("58d3c7fa4694012d58d7141d", 0, 1);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

