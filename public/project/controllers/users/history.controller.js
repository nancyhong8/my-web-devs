(function() {
    angular
        .module("WebAppMaker")
        .controller("historyController", historyController);

    function historyController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams["uid"];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.viewProduct = viewProduct;
        vm.review = review;
        vm.remove = remove;
        vm.cart = cart;
        vm.contactSeller = contactSeller;
        var productsBought;
        var productSelling


        function init() {
            // This allows me to get the product objects in the user's
            // cart rather than just the product id
            var promise = UserService.findUserById(userId)
                .then(function(user) {
                    vm.user = user.data;
                    vm.cartSize = vm.user.cart.length;
                    if(vm.user.productBought.length < 1) {
                        vm.noProductsBought = "You have not bought any products";
                    }
                    if(vm.user.productSelling.length < 1) {
                        vm.noProductSelling = "You are currently not selling any products.";
                    }
                    productsSelling = vm.user.productSelling;
                    productsBought = vm.user.productBought;
                    vm.productsBought = createProductMap(productsBought);
                    vm.productsSelling = createProductMap(productsSelling);

                }, function(err) {
                    console.log(err)
                })
        }
        init();

        // Maps the product to the amount selected
        function createProductMap(products) {
            var productArr = [];
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
                        productArr.push(products[i]);
                        break;
                    }
                }
            }
            return productArr;
        }



        function viewProduct(pid) {
            $location.url("/user/" + userId + "/product/" + pid);
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
        function review(product) {
            $location.url("/user/" + userId + "/product/" + product._id + "/review")
        }
        function remove(product) {
            vm.user.productBought.splice(vm.user.productBought.indexOf(product), 1);
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .then(function(user) {
                    init();
                }, function(error) {
                    console.log(error);
                })
        }
        function cart() {
            $location.url("/user/" + userId + "/cart");
        }
        function contactSeller(product) {
            $location.url("/user/" + userId + "/message/" + product.seller);
        }

    }
})();