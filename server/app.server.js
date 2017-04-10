module.exports = function(app) {
    require("./service/user.service.server.js")(app);
    require("./service/review.service.server.js")(app);
    require("./service/product.service.server.js")(app);
}