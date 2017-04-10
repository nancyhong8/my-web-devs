(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, $routeParams, UserService) {
        var vm = this;
        vm.login = login;
        vm.welcome = welcome;
        vm.forgot = forgot;
        vm.user = {};


        function login() {
            console.log("from login controller vm.user");
            console.log(vm.user);
            var promise = UserService.findUserByCredentials(vm.user.email, vm.user.password);
            promise
                .then(function(user) {
                    $location.url("/page/home/" + user.data._id);
                }, function(err) {
                    vm.error = "Login credentials not found";
                })
        }
        function welcome() {
            console.log(vm.user);
            $location.url("/welcome");
        }
        function forgot() {

        }
    }
})();