(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $routeParams, UserService) {
        var vm = this;
        vm.welcome = welcome;
        vm.user = {roles: []};
        vm.register = register;

        function welcome() {
            $location.url("/welcome");
        }
        function register() {
            if(vm.user.password == vm.user.verifyPassword) {
                if(vm.admin) {
                    vm.user.roles.push("ADMIN");
                }
                if(vm.seller) {
                    vm.user.roles.push("SELLER");
                }
                var promise = UserService.register(vm.user);
                promise
                    .then(function(user) {
                        console.log('reach')
                        $location.url("/user/" + user.data._id + "/home");
                    }, function(error) {
                        console.log(error);
                    })
            }
            else {
                vm.error = "Passwords do not match"
            }
        }
    }
})();