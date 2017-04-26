(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUser" : findUser
        };
        return api;

        function createUser(user) {
            console.log('user from service client: ' + JSON.stringify(user));
            return $http.post("/api/user", user);

        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);

        }

        function findUser() {
            return $http.get("/api/user");
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId, user);

        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);

        }


    }
})();