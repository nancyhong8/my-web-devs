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
    }
})();