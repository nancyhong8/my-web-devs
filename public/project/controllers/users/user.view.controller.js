(function() {
    angular
        .module("WebAppMaker")
        .controller("userViewController", userViewController);

    function userViewController($location, $routeParams, ProductService, UserService, $sce, $rootScope, currentUser) {
        var vm = this;
        var profileId = $routeParams["uid"];

        vm.home = home;
        vm.logout = logout;
        vm.viewProfile = viewProfile;
        vm.viewProduct = viewProduct;
        var products;
        var userId;
        vm.remove = remove;
        vm.cart = cart;
        vm.contact = contact;
        vm.createProduct = createProduct;


        function init() {
            // This allows me to get the product objects in the user's
            // cart rather than just the product id
            var promise = UserService.findUserById(profileId)
                .then(function(user) {
                    vm.profile = user.data;
                    products = vm.profile.productSelling;
                    if(vm.profile.productSelling.length < 1) {
                        vm.noProducts = vm.profile.firstName + " is currently not selling any products.";
                    }
                    else {
                        createProductMap(products);
                    }
                }, function(err) {
                    console.log(err)
                })

            vm.user = currentUser;
            userId = vm.user._id;
            vm.cartSize = vm.user.cart.length;



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
            console.log(products);
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

        function viewProfile() {
            $location.url("/user/profile")
        }
        function home() {
            $location.url("/user/" + userId + "/home");
        }

        function remove(product) {
            vm.profile.productSelling.splice(vm.profile.productSelling.indexOf(product), 1);
            var promise = UserService.updateUser(profileId, vm.profile);
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
        function contact() {
            $location.url("/user/" + userId + "/message/" + profileId);
        }
        function createProduct() {
            $location.url("/user/" + userId + "/product");
        }
    }


})();