(function() {
    angular
        .module("WebAppMaker")
        .controller("inboxController", inboxController);

    function inboxController(currentUser, $location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams["uid"];

        vm.home = home;
        vm.logout = logout;
        vm.profile = profile;
        vm.history = history;
        vm.remove = remove;
        vm.cart = cart;
        vm.reply = reply;
        var products;


        function init() {
            // This allows me to get the product objects in the user's
            // cart rather than just the product id
            var promise = UserService.findUserById(userId)
                .then(function(user) {
                    vm.user = user.data;
                    vm.messages = vm.user.inbox;
                    if(vm.messages.length < 1) {
                        vm.noMessage = "There are no message in your inbox";
                    }
                    vm.cartSize = vm.user.cart.length;
                }, function(err) {
                    console.log(err)
                })
        }
        init();

        function remove(message) {
            vm.user.inbox.splice(vm.user.inbox.indexOf(message), 1);
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .then(function(user) {
                    init();
                }, function(error) {
                    console.log(error);
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

        function profile() {
            $location.url("/user/profile")
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
        function reply(message) {
            $location.url("/user/" + userId + "/message/" + message.from._id);
        }

    }
})();