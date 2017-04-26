(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController)
        .controller("registerController", registerController)
        .controller("profileController", profileController);

    function loginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.user = {username: "", password: ""};
        vm.register = register;

        function init() {
        }
        init();

        function login() {
            var promise = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            promise
                .then(function(user) {
                    console.log("finduserByCredentials controller success");
                    if(user.data) {
                        $location.url("/user/"+user.data._id);
                    }
                },function(error) {
                console.log("finduserByCredentials controller wrong");
                    vm.error = "Login credentials not found";
                })

        }

        function register() {
            $location.url("/register");
        }




    }


    function registerController($routeParams, $location, UserService) {
        var vm = this;
        vm.register = register;
        var userId = $routeParams["uid"];
        vm.user = {firstName: "", lastName: "", username: "", password: ""};


        function register() {
            if (vm.user.password == vm.user.passwordVerify) {
                var promise = UserService.createUser(vm.user);
                promise
                    .then(function(user) {
                        $location.url("/user/"+user.data._id);
                    }),(function(err) {
                        alert("error");
                    })
            } else {
                vm.error = "Passwords do not match";
            }

        }
    }

    function profileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.user = {firstName: "", lastName: ""
        };
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.websites = websites;

        function logout() {
            $location.url("/");
        }

        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .then(function(user) {
                    vm.user = user.data;
                }),function(error) {
                    alert(error);
            }
                // .success(function(user) {
                //     vm.user = user;
                // })
                // .error(function(error) {
                //     alert("error");
                // })
        }
        init();

        function updateUser() {
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .then(function(user) {
                    if (vm.user != null) {
                        console.log(vm.user);
                        vm.message = "User updated successfully!"
                    } else {
                        vm.message = "Unable to update user."
                    }
                }),function(error) {
                    alert(error);
                }
                // .success(function(user) {
                //     if (vm.user != null) {
                //         vm.message = "User updated successfully!"
                //     } else {
                //         vm.message = "Unable to update user."
                //     }
                // })
                // .error(function(error) {
                //     alert("error");
                // })

        }

        function websites() {
            $location.url("/user/"+userId+"/website");
        }


    }





})();