
module.exports = function(app) {


    app.post("/api/product", createProduct);
    app.get("/api/product/view/:pid", findProductById);
    app.delete("/api/product/delete/:pid", deleteProduct);
    // app.get("/api/user", findUserByCredentials);
    // app.get("/api/user/:uid", findUserById);
    // app.put("/api/user/:uid", updateUser);
    // // app.delete("/api/user/:uid", deleteUser);
    //

    var productModel = require('../models/product.model.js');
    var userModel = require('../models/user.model.js');


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/resources/uploads' });
   // app.post("/api/upload",  uploadImage);
    app.post("/api/upload", upload.single("myFile"), uploadImage)
    app.post("/api/upload/edit", upload.single("myFile"), changeImage);

    function changeImage(req, res) {
        var filename = req.file.filename;
        var id = req.body.id;
        var name = req.body.name;
        var quantity = req.body.quantity;
        var seller = req.body.seller;
        var price = req.body.price;
        var description = req.body.description;
        product = {
            '_id': id,
            'name': name,
            'quantity': quantity,
            'seller': seller,
            'description': description,
            'price': price,
            'url' : '/resources/uploads/' + filename
        }

        productModel.editProduct(product)
            .then(function(product) {
                res.redirect("/#!\/user\/" + seller + "\/home");
            }, function(error) {
                console.log(error);
            })
    }

    function uploadImage(req, res) {
        var filename = req.file.filename;
        var name = req.body.name;
        var quantity = req.body.quantity;
        var seller = req.body.seller;
        var price = req.body.price;
        var description = req.body.description;
        product = {
            'name': name,
            'quantity': quantity,
            'seller': seller,
            'description': description,
            'price': price,
            'url' : '/resources/uploads/' + filename
        }

        productModel.createProduct(product)
            .then(function(product) {
                userModel.addToProductSelling(seller, product)
                    .then(function(seller) {
                    }, function(err) {
                        console.log(err);
                    })
                res.redirect("/#!\/user\/" + seller + "\/home");
            }),function(err) {
            console.log(err);
        }
    }

    function createProduct(req, res) {
        var product = req.body;
        productModel.createProduct(product)
            .then(function(product) {
                res.send(product);
            }),function(err) {
            console.log(err);
        }
    }

    function findProductById(req, res) {
        var pid = req.params['pid'];
        productModel.findProductById(pid)
            .then(function(product) {
                res.send(product);
            }, function(err) {
                console.log(err);
            })
    }

    function deleteProduct(req, res) {
        var pid = req.params['pid'];

        productModel.deleteProduct(pid)
            .then(function (result) {
                res.send(200);
            }), function (err) {
            console.log(err);
        }
    }
};

