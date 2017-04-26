module.exports = function (app) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


    var websiteModel = require('../model/website.model.server.js');

        function createWebsite(req, res) {
            var userId = req.params['uid'];
            var newWebsite = req.body;
            newWebsite._userId = userId;

            websiteModel.createWebsiteForUser(userId, newWebsite)
                .then(function(website) {
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }

        function findWebsiteById(req, res) {
            var websiteId = req.params['wid'];

            websiteModel.findWebsiteById(websiteId)
                .then(function(website) {
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }

        function findWebsitesByUser(req, res) {
            var userId = req.params['uid'];
            websiteModel.findWebsitesByUser(userId)
                .then(function(website) {
                    res.send(website);
                }),function(err) {
                console.log(err);
            }
        }


        function updateWebsite(req, res) {
            var websiteId = req.params['wid'];
            var website = req.body;
            websiteModel.updateWebsite(websiteId, website)
                .then(function(website) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
            }
        }

        function deleteWebsite(req, res) {
            var websiteId = req.params['wid'];
            websiteModel.deleteWebsite(websiteId)
                .then(function(website) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
            }
        }



}