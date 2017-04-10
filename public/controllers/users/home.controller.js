(function() {
    angular
        .module("WebAppMaker")
        .controller("homeController", homeController);

    function homeController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.home = home;
        vm.profile = profile;
        vm.createProduct = createProduct;

        function init() {
            var promise = UserService.findAllProducts();
            promise
                .then(function(products) {
                    vm.products = products.data;
                }, function(err) {
                    console.log(err);
                });
            var promise2 = UserService.findUserById(userId);
            promise2
                .then(function(user) {
                    vm.user = user.data;

                }, function(err) {
                    console.log(err);
                })

        }
        init();


        function home() {
            $location.url("/home");
        }
        function profile() {
            // console.log("reached profile");
            $location.url("/user/" + userId);
            // $location.url("/profile/" + userId);
        }

        function createProduct() {
            $location.url("/product/new/" + userId);
        }



        // function register() {
        //     console.log(vm.user);
        //     if(vm.user.password == vm.user.verifyPassword) {
        //         var promise = UserService.createUser(vm.user);
        //         promise
        //             .then(function(user) {
        //                 $location.url("/main/" + user.data._id);
        //             })
        //     }
        //     else {
        //         vm.error = "Passwords do not match"
        //     }
        // }
    }
})();