(function() {
    angular
        .module("WebAppMaker")
        .controller("editProductController", editProductController);

    function editProductController($location, $routeParams, ProductService, UserService) {
        var vm = this;
        var uid = $routeParams['uid'];
        var pid = $routeParams['pid'];

        vm.seller = uid;
        vm.home = home;
        vm.deleteProduct = deleteProduct;
        vm.logout = logout;
        vm.profile = profile;
        vm.cart = cart;
        var user;

        function init() {
            var promise = ProductService.findProductById(pid);
            promise
                .then(function(product) {
                    vm.product = product.data;
                }, function(error) {
                    console.log(error);
                })
            var promise1 = UserService.findUserById(uid);
            promise1
                .then(function(user) {
                    user = user;
                    vm.cartSize = user.data.cart.length;
                })
        }
        init();



        function logout() {
            var promise = UserService.logout();
            promise
                .then(function(result) {
                    $location.url("/welcome");
                }, function(error) {
                    console.log(error);
                })
        }

        function cart() {
            $location.url("/user/" + uid + "/cart");
        }
        function profile() {
            $location.url("/user/" + uid);
        }




        function home() {
            $location.url("/user/" + uid + "/home");
        }

        function deleteProduct() {
            if(user.roles.includes('ADMIN') || user._id == vm.seller) {
                var promise = ProductService.deleteProduct(pid);
                promise
                    .then(function(product) {
                        $location.url("/user/" + uid + "/home");
                    }, function(error) {
                        console.log(error);
                    })
            }
            else {
                vm.message = "You are unauthorized to delete product";
            }

        }

    }
})();