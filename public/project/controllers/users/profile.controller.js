(function() {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController(currentUser, $location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.home = home;
        vm.update = update;
        vm.logout = logout;
        vm.history = history;
        vm.user = currentUser;
        vm.cartSize = vm.user.cart.length;
        vm.cart = cart;
        vm.deleteUser = deleteUser;
        vm.inbox = inbox;
        vm.viewProfile = viewProfile;
        vm.createProduct = createProduct;
        var userId = vm.user._id;

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
            var promise = UserService.updateMe(vm.user._id, vm.user);
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
            $location.url("/user/" + userId + "/home");
        }
        function history() {
            $location.url("/user/" + userId + "/history");
        }
        function cart() {
            $location.url("/user/" + userId + "/cart");
        }

        function deleteUser() {
            UserService.deleteMe(userId)
                .then(function(result) {
                    logout();
                    $location.url("/welcome");
                }, function(error) {
                    console.log(error);
                })
        }

        function inbox() {
            $location.url("/user/" + userId + "/inbox");
        }
        function viewProfile() {
            $location.url("/user/" + userId + "/view");
        }
        function createProduct() {
            $location.url("/user/" + userId + "/product");
        }
    }
})();