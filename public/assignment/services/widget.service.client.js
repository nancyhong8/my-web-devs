(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "reorderWidget": reorderWidget
        };
        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);

        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");

        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }


        function updateWidget(widgetId, widget) {
            console.log("updatewidget from service client");
            console.log(widget);
            return $http.put("/api/widget/"+widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        /// TODO this function is giving me error
        function reorderWidget(pageId, start, end) {
            var indices = [start, end];
            // return $http.get("/re/page/" + pageId + "/start/:" + start + "/end/:" + end);
            return $http.put("/page/" + pageId + "/widget", indices);

        }


    }
})();