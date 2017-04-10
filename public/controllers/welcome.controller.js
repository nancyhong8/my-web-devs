(function() {
    angular
        .module("WebAppMaker")
        .controller("welcomeController", welcomeController);

    function welcomeController($location, $routeParams) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        function init() {

        }
        init();

        function login() {
            $location.url("/user/login");
        }
        function register() {
            $location.url("/user/register");
        }
    }
})();