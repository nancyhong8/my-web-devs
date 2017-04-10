(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $routeParams, UserService) {
        var vm = this;
        vm.welcome = welcome;
        vm.user = {'seller': '0'};
        vm.register = register;

        function welcome() {
            console.log(vm.user);
            $location.url("/welcome");
        }
        function register() {
            console.log(vm.user);
            if(vm.user.password == vm.user.verifyPassword) {
                var promise = UserService.createUser(vm.user);
                promise
                    .then(function(user) {
                        $location.url("/page/home/" + user.data._id);
                    })
            }
            else {
                vm.error = "Passwords do not match"
            }
        }
    }
})();