module.exports = function (app) {

    console.log('user service server');

    app.post("/api/user", createUser);
    // app.get("/api/user?username=username", findUserByUsername());
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);


        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonderland.com"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com"},
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@charly.com"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com "}
        // ];

        var userModel = require('../model/user.model.server.js');

        function createUser(req, res) {
            var newUser = req.body;
            userModel.createUser(newUser)
                .then(function(user) {
                    res.send(user);
                }),function(err) {
                console.log(err);
                }
            // res.send(newUser);
        }

        function findUserById(req, res) {
            var userId = req.params['uid'];
            userModel.findUserById(userId)
                .then(function(user) {
                    console.log('sending user from server:' + user);
                    res.send(user);
                }),function(err) {
                console.log(err);
            }
        }

        // function findUserByUsername(req, res) {
        //     // // var username = req.query['username'];
        //     // for(var u in users) {
        //     //     if( users[u].username == username) {
        //     //         res.send(users[u]);
        //     //         return;
        //     //     }
        //     // }
        //     // res.sendStatus(404);
        // }

        function findUserByCredentials(req, res) {
            var username = req.query.username;
            var password = req.query.password;

            userModel.findUserByCredentials(username, password)
                .then(function(user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.sendStatus(404);
                    }
                },function(err) {
                res.sendStatus(500);
            })

            // for(var u in users) {
            //     if( users[u].username == username &&
            //         users[u].password == password ) {
            //         console.log("reached before send");
            //         res.send(users[u]);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
        }

        function updateUser(req, res) {
            var userId = req.params['uid'];
            var user = req.body;

            userModel.updateUser(userId, user)
                .then(function(user) {
                    res.sendStatus(200);
                }),function(err) {
                console.log(err);
            }

            // for(var u in users) {
            //     if(users[u]._id == userId) {
            //         users[u] = req.body;
            //         res.sendStatus(200);
            //         return;
            //     }
            // }
            // res.sendStatus(404);

        }

        function deleteUser(req, res) {
            var userId = req.params['uid'];

            userModel.deleteUser(userId)
                .then(function(user) {
                    res.send(200);
                }),function(err) {
                console.log(err);
            }

            // for(i=0; i<users.length; i++) {
            //     if(users[i]._id == userId) {
            //         users.splice(i, 1);
            //         res.sendStatus(200);
            //         return;
            //     }
            // }
            // res.sendStatus(404);
        }


};