(function() {
    angular
        .module("WebAppMaker")
        .controller("listReview", listReview);

    function listReview($location, $routeParams, ProductService, UserService, ReviewService, $sce) {
        var vm = this;
        var pid = $routeParams["pid"];
        var uid = $routeParams['uid'];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.toProduct = toProduct;
        vm.cart = cart;
        vm.editReview = editReview;

        function init() {
            var promise = ReviewService.findReviewsByProduct(pid);
            promise
                .then(function(reviews) {
                    vm.reviews = reviews.data;
                    if(vm.reviews.length < 1) {
                        vm.noReviews = "There are no reviews for this product";
                    }
                    console.log(vm.reviews);
                }, function(error) {
                    console.log(error);
                })
            var promise1 = ProductService.findProductById(pid);
            promise1
                .then(function(product) {
                    vm.product = product.data;
                }, function(err) {
                    console.log(err);
                })
            var promise2 = UserService.findUserById(uid);
            promise2
                .then(function(user) {
                    vm.user = user.data;
                    vm.userId = vm.user._id
                    vm.cartSize = user.data.cart.length;
                }, function(err) {
                    console.log(err);
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

        function home() {
            $location.url("/user/" + uid + "/home");
        }

        function profile() {
            $location.url("/user/" + uid);
        }

        function toProduct() {
            $location.url("/user/" + uid + "/product/" + pid);
        }

        function cart() {
            $location.url("/user/" + uid + "/cart");
        }
        function editReview(review) {
            $location.url("/user/" + uid + "/product/" + pid + "/review/" + review._id)
        }

        vm.stars = function(rating) {
            if(rating == 0) {
                return $sce.trustAsResourceUrl('/../../project/resources/stars/star-0.jpg');
            }
            if(rating == 1) {
                return $sce.trustAsResourceUrl('/../../project/resources/stars/star-1.jpg');
            }
            if(rating == 2) {
                return $sce.trustAsResourceUrl('/../../project/resources/stars/star-2.jpg');
            }
            if(rating == 3) {
                return  $sce.trustAsResourceUrl('/../../project/resources/stars/star-3.jpg');
            }
            if(rating == 4) {
                return $sce.trustAsResourceUrl('/../../project/resources/stars/star-4.jpg');
            }
            if(rating == 5) {
                return $sce.trustAsResourceUrl('/../../project/resources/stars/star-5.jpg');
            }
        }



    }
})();