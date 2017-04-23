(function () {
    angular
        .module("WebAppMaker")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            createReview: createReview,
            findReviewsByProduct: findReviewsByProduct,
            findReviewById: findReviewById,
            editReview: editReview,
            deleteReview: deleteReview
        //     "createUser": createUser,
        //     "findUserById": findUserById,
        //     // "findUserByUsername": findUserByUsername,
        //     "findUserByCredentials": findUserByCredentials,
        //     "updateUser": updateUser,
        //     "findAllProducts": findAllProducts,
        //     // "deleteUser": deleteUser,
        //     // "findUser" : findUser
        };
        return api;

        function createReview(uid, pid, review) {
            return $http.post("/api/user/" + uid + "/product/" + pid + "/review", review);
        }

        function findReviewsByProduct(pid) {
            return $http.get("/api/product/" + pid + "/reviews");
        }

        function findReviewById(rid) {
            return $http.get("/api/review/" + rid);
        }
        function editReview(review) {
            return $http.put("/api/review/" + review._id, review);
        }
        function deleteReview(rid) {
            return $http.delete("/api/review/" + rid);
        }
        //
        // function createUser(user) {
        //     console.log(user);
        //     return $http.post("/api/user", user);
        //
        // }
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