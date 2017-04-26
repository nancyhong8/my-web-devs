(function() {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController)
        .controller("newPageController", newPageController)
        .controller("editPageController", editPageController);


    function pageListController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.newPage = newPage;
        vm.websites = websites;
        vm.profile = profile;
        vm.widget = widget;
        vm.editPage = editPage;

        function init() {

            var promise = PageService.findPagesByWebsiteId(websiteId);
            promise
                .then(function(page) {
                    vm.pages = page.data;
                }),(function(err) {
                    alert("INIT ERROR");
                })
        }

        init();

        function newPage() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/new");
        }

        function websites() {
            $location.url("/user/" + userId + "/website/");
        }

        function profile() {
            $location.url("/user/" + userId);
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var promise = PageService.findPageById(pageId);
            promise
                .then(function(page) {
                    vm.page = page.data;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
                }),(function(err) {
                    vm.error = "Cannot Edit Page";
                })
        }
    }

    function newPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pages = pages;
        vm.page = {name: "", title: ""};
        vm.createPage = createPage;
        vm.profile = profile;
        vm.websiteList = websiteList;
        vm.widget = widget;
        vm.editPage = editPage;

        function init() {
            // var promise = PageService.findPageById();
            var promise2 = PageService.findPagesByWebsiteId(websiteId);
            //
            // promise
            //     .then(function(page) {
            //         vm.page = page.data;
            //     }),(function(err) {
            //         alert("INIT ERROR");
            //     })
            promise2
                .then(function(page) {
                    vm.pages = page.data;
                }),(function(err) {
                    alert("INIT ERROR");
                })
        }
        init();

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function createPage() {
            var promise = PageService.createPage(websiteId, vm.page);
            promise
                .then(function(page) {
                    vm.page = page.data;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                }),(function(err) {
                    alert("Cannot Create Page");
                })
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function websiteList() {
            $location.url("/user/" + userId + "/website/");
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var promise = PageService.findPageById(pageId);

            promise
                .then(function(page) {
                    vm.page = page.data;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
                }),(function(err) {
                    alert("INIT ERROR");
                })

        }

    }

    function editPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.pages = pages;
        var pageId = $routeParams["pid"];
        vm.pageId = pageId;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.page = {name: "", title: ""};
        vm.websiteList = websiteList;
        vm.widget = widget;
        vm.newPage = newPage

        function init() {
            var promise = PageService.findPageById(pageId);
            var promise2 = PageService.findPagesByWebsiteId(websiteId);
            promise
                .then(function(page) {
                    vm.page = page.data;
                }),(function(err) {
                    alert("INIT ERROR");
                })
            promise2
                .then(function(page) {
                    vm.pages = page.data;
                }),(function(err) {
                    alert("INIT ERROR");
                })
        }
        init();

        function updatePage(page) {
            var page;
            var promise = PageService.updatePage(pageId, vm.page);
            promise
                .then(function(inPage) {
                    page = inPage.data;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                }),(function(err) {
                    alert("INIT ERROR");
                })
        }

        function deletePage() {
            var page;
            var promise = PageService.deletePage(pageId);
            promise
                .then(function(inPage) {
                    page = inPage.data;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                }),(function(err) {
                    alert("INIT ERROR");
                })
        }

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function profile() {
            $location.url("/user/" + userId);
        }
        function websiteList() {
            $location.url("/user/" + userId + "/website/");
        }

        function widget(pageId) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function newPage() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/new");
        }
    }


})();