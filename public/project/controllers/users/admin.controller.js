(function() {
    angular
        .module("WebAppMaker")
        .controller("adminController", adminController);

    function adminController(adminUser, $location, $routeParams, UserService, $rootScope) {

        var vm = this;


        vm.user = adminUser;
        var uid = vm.user._id;
        vm.cartSize = vm.user.cart.length;
        vm.viewUser = viewUser;
        vm.home = home;
        vm.logout = logout;
        vm.remove = remove;
        vm.cart = cart;
        vm.editUser = editUser;
        vm.createUser = createUser;
        vm.profile = profile;

        function init() {
            var promise = UserService.findAllUsers()
                .then(function(users) {
                    vm.users = users.data;
                }, function(err) {
                    console.log(err)
                })
        }
        init();

        function logout() {
            var promise = UserService.logout();
            promise
                .then(function(result) {
                    $rootScope.adminUser = null;
                    $location.url("/welcome");
                }, function(error) {
                    console.log(error);
                })
        }
        function home() {
            $location.url("/user/" + uid + "/home");
        }
        function cart() {
            $location.url("/user/" + uid + "/cart");
        }

        function remove(userId) {
            UserService.deleteUser(userId)
                .then(function(result) {
                    init();
                }, function(error) {
                    console.log(error);
                })
        }
        function editUser(userId) {
            $location.url("/user/profile/" + userId);
        }
        function viewUser(uid) {
            $location.url("/user/" + uid + "/view");
        }
        function createUser() {
            $location.url("/user/register");
        }
        function profile() {
            $location.url("/user/profile");
        }

    }
})();