(function() {
    angular
        .module("WebAppMaker")
        .controller("historyController", historyController);

    function historyController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];

        vm.home = home;
        vm.welcome = welcome;
        vm.profile = profile;
        vm.productView = productView;


        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .then(function(user) {
                    vm.user = user.data;
                }, function(err) {
                    console.log(err);
                })
            var promise2 = UserService.findProductsByUser(userId);
            promise2
                .then(function(products) {
                    vm.products = products.data;
                }, function(err) {
                    console.log(err)
                })
        }
        init();


        function home() {
            $location.url("/page/home/" + userId);
        }

        function welcome() {
            $location.url("/welcome");
        }

        function profile() {
            $location.url("/user/" + userId);
        }
        function productView(pid) {
            console.log(pid);
            var promise = UserService.findProductById(pid);
            promise
                .then(function(product) {
                    console.log("FOUND THE PRODUCT");
                    console.log(product.data);
                    $location.url("/product/view/" + pid);
                }, function(err) {

                })
        }

    }
})();