(function() {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];

        vm.home = home;
        vm.update = update;
        vm.welcome = welcome;
        vm.history = history;

        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .then(function(user) {
                    vm.user = user.data;
                }, function(err) {
                    console.log(err);
                })
        }
        init();

        function home() {
            $location.url("/page/home/" + userId);
        }

        function update() {
            var promise = UserService.updateUser(vm.user._id, vm.user);
            promise
                .then(function(user) {
                    vm.message = "Successfully updated user"
                }, function(err) {
                    console.log(err);
                })
        }
        function welcome() {
            $location.url("/welcome");
        }

        function history() {
            $location.url("/page/history/" + userId);
        }

    }
})();