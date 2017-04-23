(function() {
    angular
        .module("WebAppMaker")
        .controller("homeController", homeController);

    function homeController($sce, currentUser, $location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.profile = profile;
        vm.createProduct = createProduct;
        vm.logout = logout;
        vm.viewProduct = viewProduct;
        vm.cart = cart;
        vm.user = currentUser;
        vm.cartSize = vm.user.cart.length;
        vm.rating = rating;
        vm.viewUsers = viewUsers;

        function init() {
            var promise = UserService.findAllProducts();
            promise
                .then(function(products) {
                    vm.products = products.data;
                }, function(err) {
                    console.log(err);
                });
        }
        init();


        function profile() {
            $location.url("/user/" + userId);
        }

        function createProduct() {
            $location.url("/user/" + userId + "/product");
        }

        function logout() {
            var promise = UserService.logout();
            promise
                .then(function(result) {
                    $rootScope.currentUser = null;
                    $location.url("/welcome");
                }, function(error) {
                    console.log(error);
                })
        }

        function viewProduct(pid) {
            $location.url("/user/" + userId + "/product/" + pid);
        }

        function cart() {
            $location.url("/user/" + userId + "/cart");
        }

        function rating(reviews) {
            var rate = 0;
            for(i = 0; i < reviews.length; i++) {
                rate = rate + parseInt(reviews[i].rating);
            }
            rate = rate/reviews.length;
            if (rate > 0) {
                vm.rate = rate.toFixed(1) + " stars with " + reviews.length + " ratings";
            }
            if (rate.toFixed(0) == 1) {
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-1.jpg');
            }
            else if (rate.toFixed(0) == 2) {
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-2.jpg');

            }
            else if (rate.toFixed(0) == 3) {
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-3.jpg');
            }
            else if (rate.toFixed(0) == 4) {
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-4.jpg');
            }
            else if (rate.toFixed(0) == 5) {
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-5.jpg');
            }
            else {
                vm.rate = "No reviews yet"
                vm.stars = $sce.trustAsResourceUrl('/../../project/resources/stars/star-0.jpg');
            }
        }

        function viewUsers() {
            $location.url('/admin/all');
        }

    }
})();