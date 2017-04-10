(function() {
    angular
        .module("WebAppMaker")
        .controller("newProductController", newProductController);

    function newProductController($location, $routeParams, ProductService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.seller = userId;
        vm.save = save;
        vm.product = {};
        vm.product.seller = userId;
        vm.home = home;


        function home() {
            $location.url("/page/home/" + userId);
        }
        function save() {
            var promise = ProductService.createProduct(vm.product);
            promise
                .then(function(product) {
                    $location.url("/page/home/" + userId);
                }, function(err) {
                    console.log(err);
                })
        }
        // function profile() {
        //     // console.log("reached profile");
        //     $location.url("/user/" + userId);
        //     // $location.url("/profile/" + userId);
        // }
        //
        // function createProduct() {
        //     $location.url("/product/new");
        // }



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