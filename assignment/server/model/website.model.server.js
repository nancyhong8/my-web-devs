

    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();
    var websiteModel = mongoose.model('webdevSPR17Websites', websiteSchema);
    var userModel = require('./user.model.server.js');





    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();

        websiteModel.create(website, function (err, website) {
            deferred.resolve(website);
            userModel.findByIdAndUpdate(userId,
                {$push: {"websites": {_id: website._id}}},
                {safe: true, upsert: true, new : true},
                function(err, result) {
                    console.log(err);
                });
        });
        return deferred.promise;
    }

    function findWebsitesByUser(userId) {
        var deferred = q.defer();

        websiteModel.find({_userId: userId}, function(err, website) {
            deferred.resolve(website);
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel.findById(websiteId, function(err, website) {
            deferred.resolve(website);
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel.update({'_id': websiteId}, {$set: {
            'description': website.description,
            'name': website.name
        }
        }, function(err, website) {
            deferred.resolve(website);
        });
        return deferred.promise;
    }


    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        var userId;

        websiteModel.findByIdAndRemove(websiteId, function(err, website) {
            userId = website._userId;
            console.log("delete website from model userId:" + userId);
            userModel.findUserById(userId)
                .then(function (user) {
                    user.websites.splice(user.websites.indexOf(websiteId), 1);
                    user.save(function (response) {
                        deferred.resolve(response);
                    });
                });
        });
        return deferred.promise;
    }

    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findWebsitesByUser = findWebsitesByUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;

    module.exports = websiteModel;

