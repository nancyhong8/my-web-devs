(function () {
    angular
        .module("WebAppMaker")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var api = {
            "createProduct": createProduct,
            "findProductById": findProductById
            // "findUserById": findUserById,
            // // "findUserByUsername": findUserByUsername,
            // "findUserByCredentials": findUserByCredentials,
            // "updateUser": updateUser,
            // "findAllProducts": findAllProducts,
            // "deleteUser": deleteUser,
            // "findUser" : findUser
        };
        return api;

        function createProduct(product) {
            return $http.post("/api/product", product);

        }

        function findProductById(pid) {
            return $http.get("/api/product/view/" + pid);
        }
        // function findUserByCredentials(email, password) {
        //     return $http.get("/api/user?email="+email+"&password="+password);
        //
        // }
        // function findUserById(userId) {
        //     return $http.get("/api/user/"+userId);
        // }
        // function updateUser(userId, user) {
        //     return $http.put("/api/user/"+userId, user);
        // }
        // function findAllProducts() {
        //     return $http.get("/api/products");
        // }
        //
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