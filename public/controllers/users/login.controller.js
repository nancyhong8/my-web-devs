(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, $routeParams, UserService) {
        var vm = this;
        vm.login = login;
        vm.welcome = welcome;
        vm.user = {};


        function login() {
            var promise = UserService.login(vm.user);
            promise
                .then(function(user) {
                    $location.url("/user/" + user.data._id + "/home");
                }, function(err) {
                    vm.error = "Login credentials not found";
                })
        }
        function welcome() {
            console.log(vm.user);
            $location.url("/welcome");
        }

    }
})();