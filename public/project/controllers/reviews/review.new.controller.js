(function() {
    angular
        .module("WebAppMaker")
        .controller("newReview", newReview);

    function newReview($location, $routeParams, ReviewService, UserService, $sce) {
        var vm = this;
        var pid = $routeParams["pid"];
        var uid = $routeParams['uid'];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.product = product;
        vm.cart = cart;
        vm.submit = submit;

        function init() {
            var promise = UserService.findUserById(uid);
            promise
                .then(function(user) {
                    vm.user = user.data;
                    vm.cartSize = user.data.cart.length;
                }, function(err) {
                    console.log(err);
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

        function submit() {
            var promise = ReviewService.createReview(uid, pid, vm.review);
            promise
                .then(function(review) {
                    vm.message = "Thanks for reviewing!";
                }, function(error) {
                    console.log(error);
                })
        }

    }
})();