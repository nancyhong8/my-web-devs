(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, $routeParams, UserService, $sce) {
        var vm = this;
        vm.login = login;
        vm.welcome = welcome;
        vm.user = {};

        vm.image = $sce.trustAsResourceUrl("http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2015/01/power-from-plants.jpg")

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