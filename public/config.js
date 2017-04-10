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
                controllerAs: "model"
            })
            .when("/page/home/:uid", {
                templateUrl: "views/users/home.view.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/page/history/:uid", {
                templateUrl: "views/users/history.view.html",
                controller: "historyController",
                controllerAs: "model"
            } )
            .when("/product/new/:uid", {
                templateUrl: "views/products/product.page.view.html",
                controller: "newProductController",
                controllerAs: "model"
            })
            .when("/product/view/:pid", {
                templateUrl: "views/products/product.view.html",
                controller: "viewProductController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/welcome"
            })
    }
})();