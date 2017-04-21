(function() {
    angular
        .module("WebAppMaker")
        .controller("newProductController", newProductController);

    function newProductController($location, $routeParams, ProductService, UserService) {
        var vm = this;
        var uid = $routeParams['uid'];

        vm.seller = uid;
        vm.save = save;
        vm.product = {};
        vm.product.seller = uid;
        vm.home = home;

        vm.logout = logout;
        vm.profile = profile;
        vm.cart = cart;

        function init() {
            var promise = UserService.findUserById(uid);
            promise
                .then(function(user) {
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

        function save() {
            var promise = ProductService.createProduct(vm.product);
            promise
                .then(function(product) {
                    $location.url("/page/home/" + uid);
                }, function(err) {
                    console.log(err);
                })
        }
    }
})();