(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "login": login,
            "register": register,
            "findUserById": findUserById,
            "loggedIn": loggedIn,
            "logout": logout,
            "findProductsByUser": findProductsByUser,
            // "removeFromCart": removeFromCart,
            "isAdmin": isAdmin,
            "findAllUsers": findAllUsers,
            "deleteUser": deleteUser,
            "updateMe": updateMe,
            "deleteMe": deleteMe,


            // "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "findAllProducts": findAllProducts,
            "findProductById": findProductById
            // "deleteUser": deleteUser,
            // "findUser" : findUser
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }
        function login(user) {
            console.log(user);
            return $http.post("/api/login", user);
        }
        function findUserById(userId) {
            return $http.get("/api/user/find/" + userId);
        }
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        function logout() {
            return $http.post("/api/logout");
        }
        // function removeFromCart(uid, product) {
        //     return $http.put("/api/user/remove/cart/" + uid, product);
        // }
        function isAdmin() {
            return $http.post("/api/isAdmin");
        }
        function findAllUsers() {
            return $http.get("/api/admin/user");
        }
        function deleteUser(uid) {
            return $http.delete("/api/user/admin/" + uid);
        }
        function deleteMe(uid) {
            return $http.delete("/api/user/" + uid + "/delete");
        }




        function findUserByCredentials(email, password) {
            return $http.get("/api/user?email="+email+"&password="+password);

        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId, user);
        }
        function findAllProducts() {
            return $http.get("/api/products");
        }
        function findProductsByUser(userId) {
            return $http.get("/api/products/" + userId);
        }
        function findProductById(productId) {
            return $http.get("/api/product/view/" + productId);
        }

        function updateMe(uid, user) {
            return $http.put("/api/user/" + uid, user);
        }
        // function findUserByUsername(username) {
        //     return $http.get("/api/user?username="+username);
        // }


        //
        // function findUser() {
        //     return $http.get("/api/user");
        // }
        //

        //
        // function deleteUser(userId) {
        //     return $http.delete("/api/user/"+userId);
        //
        // }

    }
})();