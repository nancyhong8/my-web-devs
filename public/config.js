(function() {
    angular
        .module("WebAppMaker")
        .config(Configuration);

    function Configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/welcome", {
                templateUrl: "views/welcome.view.html",
                controller: "welcomeController",
                controllerAs: "model"
            })
            .when("/user/login", {
                templateUrl: "views/users/login.view.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/user/register", {
                templateUrl: "views/users/register.view.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/message/:to", {
                templateUrl: "views/users/message.view.html",
                controller: "messageController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/inbox", {
                templateUrl: "views/users/inbox.view.html",
                controller: "inboxController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/view", {
                templateUrl: "views/users/user.view.html",
                controller: "userViewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/admin/all", {
                templateUrl: "views/users/admin.view.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    adminUser: checkAdmin,
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/home", {
                templateUrl: "views/users/home.view.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/history", {
                templateUrl: "views/users/history.view.html",
                controller: "historyController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/cart", {
                templateUrl: "views/users/cart.view.html",
                controller: "cartController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/product", {
                templateUrl: "views/products/product.new.view.html",
                controller: "newProductController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/product/:pid", {
                templateUrl: "views/products/product.view.html",
                controller: "viewProductController",
                controllerAs: "model"
            })
            .when("/user/:uid/product/:pid/edit", {
                templateUrl: "views/products/product.edit.html",
                controller: "editProductController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/product/:pid/review", {
                templateUrl: "views/reviews/review.new.html",
                controller: "newReview",
                controllerAs: "model"
            })
            .when("/user/:uid/product/:pid/reviews", {
                templateUrl: "views/reviews/review.list.html",
                controller: "listReview",
                controllerAs: "model"
            })
            .when("/user/:uid/product/:pid/review/:rid", {
                templateUrl: "views/reviews/review.edit.html",
                controller: "editReview",
                controllerAs: "model"
            })



            .otherwise({
                redirectTo: "/welcome"
            })
    }

    function checkLogin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService.loggedIn()
            .then(function(user) {
                if(user.data != '0') {
                    deferred.resolve(user.data);
                }
                else {
                    $location.url('/user/login');
                    deferred.reject();
                }
            })
        return deferred.promise;
    }

    function checkAdmin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService.isAdmin()
            .then(function(user) {
                if(user.data != '0') {
                    deferred.resolve(user.data);
                }
                else {
                    $location.url('/user/login');
                    deferred.reject();
                }
            })
        return deferred.promise;
    }
})();