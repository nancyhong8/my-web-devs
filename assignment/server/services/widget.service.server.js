module.exports = function (app) {

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    // app.get("/page/:pid/start/:index1/end/:index2", reorderWidget);
    app.put("/page/:pid/widget/start=index1/end=index2");
    app.put("/page/:pid/widget", reorderWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = require('../model/widget.model.server.js');

    function uploadImage(req, res) {
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var url = '/assignment/#!\/user\/'+userId+'\/website\/'+websiteId+'\/page\/'+pageId+'\/widget\/';
        var widget = {"_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width, "url": "/uploads/" + filename};
        res.redirect(url);
    }


        function createWidget(req, res) {
            var pageId = req.params['pid'];
            var widget = req.body;
            widget._page = pageId;
            widgetModel.createWidget(pageId, widget)
                .then(function(widget) {
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }

        function findWidgetsByPageId(req, res) {
            var pageId = req.params['pid'];
            widgetModel.findAllWidgetsForPage(pageId)
                .then(function(widget) {
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }

        function findWidgetById(req, res) {
            var widgetId = req.params['wgid'];
            widgetModel.findWidgetById(widgetId)
                .then(function(widget) {
                    res.send(widget);
                }),function(err) {
                console.log(err);
            }
        }


        function updateWidget(req, res) {
            var widgetId = req.params['wgid'];
            var pageId = req.params['pid'];
            var widget = req.body;

            widgetModel.updateWidget(widgetId, widget)
                .then(function(widget) {
                    res.sendStatus(200);
                }),function(err) {
                res.sendStatus(404);
                console.log(err);
            }
        }

        function deleteWidget(req, res) {
            var widgetId = req.params['wgid'];
            widgetModel.deleteWidget(widgetId)
                .then(function(widget) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }

        function reorderWidget(req, res) {
            var pageId = req.params['pid'];
            var start = req.body[0];
            var end = req.body[1];
            widgetModel.reorderWidget(pageId, start, end)
                .then(function(widget) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
                res.sendStatus(404);
            }
        }


}