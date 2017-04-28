(function() {
    angular
        .module("WebAppMaker")
        .controller("profileAdminEditController", profileAdminEditController);

    function profileAdminEditController(adminUser, $location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.home = home;
        vm.update = update;
        vm.logout = logout;
        vm.history = history;
        vm.cartSize = adminUser.cart.length;
        vm.cart = cart;
        vm.deleteUser = deleteUser;
        vm.inbox = inbox;
        vm.viewProfile = viewProfile;
        vm.createProduct = createProduct;

        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .then(function(user) {
                    vm.user = user.data;
                    var userId = vm.user._id;
                }, function(error) {
                    console.log(error);
                })
        }
        init();

        function update() {
            // handling the role of the user
            if(vm.role) {
                if(vm.role.includes("REMOVE")) {
                    vm.user.roles.splice(vm.user.roles.indexOf("SELLER"), 1);
                }
                else {
                    vm.user.roles.push(vm.role);
                }
            }
            var promise = UserService.updateUser(vm.user._id, vm.user);
            promise
                .then(function(user) {
                    vm.message = "Successfully updated user"
                }, function(err) {
                    console.log(err);
                })
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

        function home() {
            $location.url("/user/" + adminUser._id + "/home");
        }
        function history() {
            $location.url("/user/" + userId + "/history");
        }
        function cart() {
            $location.url("/user/" + adminUser._id + "/cart");
        }

        function deleteUser() {
                    UserService.deleteUser(userId)
                        .then(function(result) {
                            $location.url("/admin/all");
                        }, function(error) {
                            console.log(error);
                        })
        }

        function inbox() {
            $location.url("/user/" + adminUser._id + "/inbox");
        }
        function viewProfile() {
            $location.url("/user/" + userId + "/view");
        }
        function createProduct() {
            $location.url("/user/" + adminUser._id + "/product");
        }
    }
})();