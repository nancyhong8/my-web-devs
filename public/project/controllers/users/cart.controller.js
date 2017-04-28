(function() {
    angular
        .module("WebAppMaker")
        .controller("cartController", cartController);

    function cartController(currentUser, $location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams["uid"];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.history = history;
        vm.createProduct = createProduct;
        vm.viewProduct = viewProduct;
        vm.remove = remove;
        vm.checkout = checkout;
        vm.viewProduct = viewProduct;
        var products;


        function init() {
            // This allows me to get the product objects in the user's
            // cart rather than just the product id
            var promise = UserService.findUserById(userId)
                .then(function(user) {
                    vm.user = user.data;
                    if(vm.user.cart.length < 1) {
                        vm.noProducts = "There are no products in your cart";
                    }
                    products = vm.user.cart;
                    createProductMap(products);

                }, function(err) {
                    console.log(err)
                })
        }
        init();

        // Maps the product to the amount selected
        function createProductMap(products) {
            var  productMap = {};
            vm.products = [];
            for(i = 0; i < products.length; i++) {
                if(productMap[products[i].name]) {
                    productMap[products[i].name] = productMap[products[i].name] + 1;
                }
                else {
                    productMap[products[i].name] = 1;
                }
            }
            for(var key in productMap) {
                for(i = 0; i < products.length; i++) {
                    if(products[i].name == key) {
                        products[i].quantity = productMap[key];
                        vm.products.push(products[i]);
                        break;
                    }
                }
            }
        }


        function viewProduct(pid) {
            $location.url("/user/" + userId + "/product/" + pid);
        }

        function remove(product) {
            vm.user.cart.splice(vm.user.cart.indexOf(product), 1);
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .then(function(user) {
                    init();
                }, function(error) {
                    console.log(error);
                })
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

        function profile() {
            $location.url("/user/profile")
        }
        function home() {
            $location.url("/user/" + userId + "/home");
        }
        function history() {
            $location.url("/user/" + userId + "/history");
        }

        function checkout() {
            for(i = 0; i < products.length; i ++) {
                vm.user.productBought.push(products[i]);
            }
            vm.user.cart = [];
            var promise = UserService.updateMe(userId, vm.user);
            promise
                .then(function(result) {
                    $location.url("/user/" + userId + "/history");
                }, function(error) {
                    console.log(error);
                })

        }

        function viewProduct(pid) {
            $location.url("/user/" + userId + "/product/" + pid);
        }

    }
})();