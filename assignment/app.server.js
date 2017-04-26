module.exports = function(app) {
    require("./server/services/user.service.server.js")(app);
    require("./server/services/website.service.server.js")(app);
    require("./server/services/page.service.server.js")(app);
    require("./server/services/widget.service.server.js")(app);
}