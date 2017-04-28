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
            "isAdmin": isAdmin,
            "findAllUsers": findAllUsers,
            "deleteUser": deleteUser,
            "updateMe": updateMe,
            "deleteMe": deleteMe,
            "sendMessage": sendMessage,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "findAllProducts": findAllProducts,
            "findProductById": findProductById
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }
        function login(user) {
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
            return $http.put("/api/admin/user/"+userId, user);
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

        function sendMessage(uid, message) {
            return $http.put("/api/user/message/" + uid, message);
        }

    }
})();