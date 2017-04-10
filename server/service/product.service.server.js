
module.exports = function(app) {


    app.post("/api/product", createProduct);
    app.get("/api/product/view/:pid", findProductById);

    // app.get("/api/user", findUserByCredentials);
    // app.get("/api/user/:uid", findUserById);
    // app.put("/api/user/:uid", updateUser);
    // // app.delete("/api/user/:uid", deleteUser);
    //

    var productModel = require('../models/product.model.js');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        console.log("reached server");
        var id            = req.body.id;
        var name          = req.body.name;
        var quantity      = req.body.quantity;
        var description   = req.body.description;
        var seller        = req.body.seller;
        var myFile        = req.file;
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        // var url = '/assignment/#!\/user\/'+userId+'\/website\/'+websiteId+'\/page\/'+pageId+'\/widget\/';
        var product = {
            "name": name,
            "quantity": quantity,
            "desription": description,
            "seller": seller,
            "_id": id,
            "url": "/uploads/" + filename};
        productModel.uploadPicture(product)
            .then(function(product) {
                res.send(product);
            }, function(err) {
                console.log(err);
            })
        // res.redirect(url);
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
                console.log("froms erver");
                console.log(product);
                res.send(product);
            }, function(err) {
                console.log(err);
            })
    }
    //
    // function findUserByCredentials(req, res) {
    //     var email = req.query.email;
    //     var password = req.query.password;
    //
    //     userModel.findUserByCredentials(email, password)
    //         .then(function(user) {
    //             if(user) {
    //                 res.send(user);
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         },function(err) {
    //             res.sendStatus(500);
    //         })
    // }
    //
    // function findUserById(req, res) {
    //     var userId = req.params['uid'];
    //     userModel.findUserById(userId)
    //         .then(function(user) {
    //             res.send(user);
    //         }),function(err) {
    //         console.log(err);
    //     }
    // }
    //
    // function updateUser(req, res) {
    //     var userId = req.params['uid'];
    //     var user = req.body;
    //
    //     userModel.updateUser(userId, user)
    //         .then(function (user) {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             console.log(err);
    //         })
    // }

    // function findUserByCredentials(req, res) {
    //     var username = req.query.username;
    //     var password = req.query.password;
    //
    //     userModel.findUserByCredentials(username, password)
    //         .then(function (user) {
    //             if (user) {
    //                 res.send(user);
    //             } else {
    //                 res.sendStatus(404);
    //             }
    //         }, function (err) {
    //             res.sendStatus(500);
    //         })
    // }



    // function deleteUser(req, res) {
    //     var userId = req.params['uid'];
    //
    //     userModel.deleteUser(userId)
    //         .then(function (user) {
    //             res.send(200);
    //         }), function (err) {
    //         console.log(err);
    //     }
    // }
};

