(function() {
    angular
        .module("WebAppMaker")
        .controller("editReview", editReview);

    function editReview($location, $routeParams, ReviewService, $sce, UserService) {
        var vm = this;
        var pid = $routeParams["pid"];
        var uid = $routeParams['uid'];
        var rid = $routeParams['rid'];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.product = product;
        vm.cart = cart;
        vm.edit = edit;
        vm.deleteReview = deleteReview;
        var user;

        function init() {
            var promise = ReviewService.findReviewById(rid);
            promise
                .then(function(review) {
                    vm.review = review.data;
                }, function(err) {
                    console.log(err);
                })
            var promise1 = UserService.findUserById(uid);
            promise1
                .then(function(user) {
                    user = user.data;
                    vm.cartSize = user.cart.length;
                }, function(error) {
                    console.log(error);
                })
        }
        init();

        function home() {
            $location.url("/user/" + uid + "/home");
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

        function profile() {
            $location.url("/user/profile");
        }

        function product() {
            $location.url("/user/" + uid + "/product/" + pid);
        }

        function cart() {
            $location.url("/user/" + uid + "/cart");
        }

        function edit() {
            if(vm.review.reviewer == uid || user.roles.includes('ADMIN')) {
                var promise = ReviewService.editReview(vm.review);
                promise
                    .then(function(review) {
                        vm.message = "Review changed successfully!";
                    }, function(error) {
                        console.log(error);
                    })
            }
            else {
                vm.message = "You are unauthorized to edit this review"
            }

        }

        function deleteReview() {
            if(vm.review.reviewer == uid || user.roles.includes('ADMIN')) {
                var promise = ReviewService.deleteReview(vm.review._id);
                promise
                    .then(function(review) {
                        $location.url("/user/" + uid + "/home");
                    }, function(error) {
                        console.log(error);
                    })
            }
            else {
                vm.message = "You are unauthorized to delete this review"
            }

        }

    }
})();