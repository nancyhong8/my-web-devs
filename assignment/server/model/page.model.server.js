

var q = require('q');
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js')();
var pageModel = mongoose.model('webdevSPR17Pages', pageSchema);
var websiteModel = require('./website.model.server.js');

function createPage(websiteId, page) {
    var deferred = q.defer();


    pageModel.create(page, function (err, page) {
        if(page) {
            deferred.resolve(page);
            websiteModel.findByIdAndUpdate(page._website,
                {$push: {"pages": {_id: page._id}}},
                {safe: true, upsert: true, new : true},
                function(err, result) {

                    console.log(err);
                });
        }

    });

    return deferred.promise;
}

function findAllPagesForWebsite(websiteId) {
    var deferred = q.defer();

    pageModel.find({'_website': websiteId}, function(err, page) {
        deferred.resolve(page);
        console.log(page);
    });
    return deferred.promise;
}

function findPageById(pageId) {
    var deferred = q.defer();

    pageModel.findOne({'_id': pageId}, function(err, page) {
        deferred.resolve(page);
    });
    return deferred.promise;
}

function updatePage(pageId, page) {
    var deferred = q.defer();

    pageModel.update({'_id': pageId}, {$set: {
        'name': page.name,
        'title': page.title,
    }
    }, function(err, page) {
        deferred.resolve(page);
    });
    return deferred.promise;
}


function deletePage(pageId) {
    var deferred = q.defer();

    pageModel.findByIdAndRemove(pageId, function(err, page) {
        websiteId = page._website;
        websiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                website.pages.splice(website.pages.indexOf(pageId), 1);
                website.save(function (response) {
                    deferred.resolve(response);
                });
            });
    });

    return deferred.promise;
}

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

