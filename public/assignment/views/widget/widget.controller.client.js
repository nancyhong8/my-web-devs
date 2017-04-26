(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController)
        .controller("newWidgetController", newWidgetController)
        .controller("editWidgetController", editWidgetController);

    function widgetListController($sce, $location, $routeParams, WidgetService, $scope) {
        var vm = this;
        var pageId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.edit = edit;
        vm.pageId = pageId;
        vm.pages = pages;
        vm.profile = profile;



        vm.orderChanged = function(start, end) {
            var promise = WidgetService.reorderWidget(pageId, start, end)
            promise
                .then(function(widget) {
                    console.log(widget);
                },function(error) {
                    console.log(error);
                })
        }


        function init() {
            var promise = WidgetService.findWidgetsByPageId(pageId);
            promise
                .then(function(widget) {
                    vm.widgets = widget.data;
                }),(function(error) {
                    alert("error");
                })
        }
        init();

        vm.newWidget = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }

        function pages() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
        function edit(widgetId) {
            console.log("widgetId from edit in edit controller:" + widgetId);
            var promise = WidgetService.findWidgetById(widgetId);
            promise
                .then(function(widget) {
                    console.log(widget);
                    var type = widget.data.type;
                    if(type == 'HTML') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget.data._id + "html");
                    }
                    if(type == 'YOUTUBE') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/youtube");
                    }
                    if(type == 'IMAGE') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/image");
                    }
                    if(type == 'HEADER') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget.data._id + "/header");
                    }
                    if(type == 'TEXT') {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/text");
                    }
                })
        }
    }

    function newWidgetController($routeParams, $location, WidgetService, $sce) {
        var vm = this;
        var widgetId = $routeParams["wgid"];

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var type = $routeParams["type"];
        function init() {
            if (type == "header") {
                vm.widget = {'type': 'HEADER'};
            }
            else if (type == "image") {
                vm.widget = {"type": "IMAGE"};
            }
            else if (type == "youtube") {
                vm.widget = {"type": "YOUTUBE"};
            }
            else if (type == "html") {
                console.log("init edit controller vierified it is html type")
                vm.widget = {"type": "HTML", "text": ""};
                vm.widget.text = $sce.trustAsHtml(vm.widget.text);
            }
            else if (type == "input") {
                console.log("init edit controller vierified it is input type")
                vm.widget = {"type": "INPUT"};
            }
        }
        init();

        vm.profile = function() {
            $location.url("/user/" + userId);
        }
        vm.widgetsList = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
        }
        vm.headerPage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/header");
        }
        vm.imagePage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/image");
        }
        vm.youtubePage = function() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/youtube");
        }
        vm.htmlPage = function() {
            console.log("htmlPage from new widget controller");
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/html");
        }
        vm.inputPage = function() {
            console.log("inputPage from new widget controller");
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/input");
        }
        vm.updateWidget = updateWidget;
        function updateWidget(widget) {

            vm.widget._page = pageId;
            console.log(vm.widget);
            var promise = WidgetService.createWidget(pageId, vm.widget);
            promise
                .then(function(widget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                }),(function(error) {
                alert("error");
            })
        }

    }

    function editWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams["wgid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var type = $routeParams["type"];
        vm.widgetId = widgetId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.profile = profile;
        vm.widgetList = widgetList;


        function init() {
            console.log("widget Id : " + widgetId);
            var promise = WidgetService.findWidgetById(widgetId);
            promise
                .then(function(widget) {
                    vm.widget = widget.data;
                    console.log(vm.widget);
                    console.log("reached found widget");
                }),(function(error) {
                    console.log(error);
            })

        }
        init();

        function updateWidget(widget) {
            console.log("updateWidget controller ");
            console.log("widget: ");
            console.log(vm.widget);
            console.log("pageID " + pageId);
            vm.widget._page = pageId;
            var promise = WidgetService.updateWidget(widgetId, vm.widget);
            promise
                .then(function(widget) {
                    console.log("reached success");
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                },(function(error) {
                    console.log(error);
                    alert("error");
                }))
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .then(function(widget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                }),(function(error) {
                    alert("error");
                })

        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function widgetList() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }

})();