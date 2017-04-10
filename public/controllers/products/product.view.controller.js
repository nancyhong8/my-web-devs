(function() {
    angular
        .module("WebAppMaker")
        .controller("viewProductController", viewProductController);

    function viewProductController($location, $routeParams, ProductService) {
        var vm = this;
        var pid = $routeParams["pid"];
        //
        // vm.home = home;
        // vm.welcome = welcome;
        // vm.profile = profile;
        // vm.productView = productView;
        //
        //
        function init() {
            console.log(pid);
            var promise = ProductService.findProductById(pid);
            promise
                .then(function(product) {
                    console.log(product.data);
                    vm.product = product.data;
                    console.log(vm.product.name)
                }, function(err) {
                    console.log(err);
                })
        }
        init();
        //
        //
        // function home() {
        //     $location.url("/page/home/" + userId);
        // }
        //
        // function welcome() {
        //     $location.url("/welcome");
        // }
        //
        // function profile() {
        //     $location.url("/user/" + userId);
        // }
        // function productView(pid) {
        //     console.log(pid);
        //     var promise = UserService.findProductById(pid);
        //     promise
        //         .then(function(product) {
        //             console.log("FOUND THE PRODUCT");
        //             console.log(product.data);
        //             $location.url("/product/view/" + product.data._id);
        //         }, function(err) {
        //
        //         })
        // }

    }
})();