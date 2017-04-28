(function () {
    angular
        .module("WebAppMaker")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var api = {
            "createProduct": createProduct,
            "findProductById": findProductById,
            "addToCart": addToCart,
            "deleteProduct": deleteProduct
        };
        return api;

        function createProduct(product) {
            return $http.post("/api/product", product);

        }
        function findProductById(pid) {
            return $http.get("/api/product/view/" + pid);
        }

        function addToCart(userId, product) {
            return $http.put("/api/user/" + userId + "/add-product", product);
        }
        function deleteProduct(pid) {
            return $http.delete("/api/product/delete/" + pid);
        }

    }
})();