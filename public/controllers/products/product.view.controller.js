(function() {
    angular
        .module("WebAppMaker")
        .controller("viewProductController", viewProductController);

    function viewProductController($location, $routeParams, ProductService, UserService, $sce) {
        var vm = this;
        var pid = $routeParams["pid"];
        var uid = $routeParams['uid'];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.reviews = reviews;
        vm.writeReview = writeReview;
        vm.addToCart = addToCart;
        vm.cart = cart;
        vm.editProduct = editProduct;

        function init() {
            var promise = ProductService.findProductById(pid);
            promise
                .then(function(product) {
                    vm.product = product.data;
                    calcReviews(vm.product.reviews);
                }, function(err) {
                    console.log(err);
                })
            var promise1 = UserService.findUserById(uid);
            promise1
                .then(function(user) {
                    vm.user = user.data;
                    console.log(vm.user);
                    vm.cartSize = user.data.cart.length;
                })
        }
        init();

        /**
         * calculates the average review to render
         * the correct review information
         * @param reviews
         */
        function calcReviews(reviews) {
            var rate = 0;
            for(i = 0; i < reviews.length; i++) {
                rate = rate + parseInt(reviews[i].rating);
            }
            rate = rate/reviews.length;
            if (rate > 0) {
                vm.rate = rate.toFixed(1) + " (" + reviews.length + " reviews)";
            }
            if (rate.toFixed(0) == 1) {
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-1.jpg');
            }
            else if (rate.toFixed(0) == 2) {
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-2.jpg');

            }
            else if (rate.toFixed(0) == 3) {
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-3.jpg');
            }
            else if (rate.toFixed(0) == 4) {
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-4.jpg');
            }
            else if (rate.toFixed(0) == 5) {
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-5.jpg');
            }
            else {
                vm.rate = "No reviews yet"
                vm.stars = $sce.trustAsResourceUrl('/../../resources/stars/star-0.jpg');
            }
        }

        function editProduct() {
            $location.url("/user/" + uid + "/product/" + pid + "/edit");
        }

        function home() {
            $location.url("/user/" + uid + "/home");
        }

        function welcome() {
            $location.url("/welcome");
        }

        function profile() {
            $location.url("/user/" + uid);
        }
        function logout() {
            var promise = UserService.logout();
            promise
                .then(function(result) {
                    $location.url("/welcome");
                }, function(error) {
                    console.log(error);
                })
        }

        function reviews() {
            $location.url("/user/" + uid + "/product/" + pid + "/reviews");
        }

        function writeReview() {
            $location.url("/user/" + uid+  "/product/" + pid + "/review");
        }

        function addToCart() {
            var promise = ProductService.addToCart(uid, vm.product);
            promise
                .then(function(result) {
                    console.log("HI")
                    vm.message = "Product added to cart successfully"
                }, function(err) {
                    console.log(err);
                })
        }

        function cart() {
            $location.url("/user/" + uid + "/cart");
        }

    }
})();