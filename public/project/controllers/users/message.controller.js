(function() {
    angular
        .module("WebAppMaker")
        .controller("messageController", messageController);

    function messageController($location, $routeParams, ProductService, UserService, $sce, $rootScope, currentUser) {
        var vm = this;
        var recipientId = $routeParams["to"];

        vm.home = home;
        vm.logout = logout;
        vm.viewProfile = viewProfile;
        vm.cart = cart;
        var userId;
        vm.send = send;

        function init() {
            // This allows me to get the product objects in the user's
            // cart rather than just the product id
            var promise = UserService.findUserById(recipientId)
                .then(function(user) {
                    vm.recipient = user.data;
                }, function(err) {
                    console.log(err)
                })

            vm.user = currentUser;
            userId = vm.user._id;
            vm.cartSize = vm.user.cart.length;

        }
        init();

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

        function cart() {
            $location.url("/user/" + userId + "/cart");
        }

        function send() {
            console.log(vm.recipient._id)
            var message = {
                message: vm.message,
                from: userId
            };
            UserService.sendMessage(vm.recipient._id, message)
                .then(function(result){
                    vm.alert = "Message sent!";
                }, function(error) {
                    console.log(error);
                })
        }
    }
})();