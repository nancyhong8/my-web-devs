module.exports = function (app) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    var pageModel = require('../model/page.model.server.js');


        // var pages = [
        //     {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //     {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //     {"_id": "543", "name": "Post 3", "websiteId": "567", "description": "Lorem" }
        // ];



        function createPage(req, res) {
            var newPage = req.body;
            var websiteId = req.params['wid'];
            newPage._website = websiteId;
            console.log("createPage from service server:");
            console.log(newPage);
            pageModel.createPage(websiteId, newPage)
                .then(function(page) {
                    res.json(page);
                }),function(err) {
                console.log(err);
            }

        }

        function findPagesByWebsiteId(req, res) {
            var websiteId = req.params['wid'];
            pageModel.findAllPagesForWebsite(websiteId)
                .then(function(page) {
                    res.send(page);
                }),function(err) {
                console.log(err);
            }
        }

        function findPageById(req, res) {
            var pageId = req.params['pid'];
            pageModel.findPageById(pageId)
                .then(function(page) {
                    res.send(page);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }


        function updatePage(req, res) {
            var pageId = req.params['pid'];
            var page = req.body;
            pageModel.updatePage(pageId, page)
                .then(function(page) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }

        function deletePage(req, res) {
            var pageId = req.params['pid'];
            pageModel.deletePage(pageId)
                .then(function(page) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }


}