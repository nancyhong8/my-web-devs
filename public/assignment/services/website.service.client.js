(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            console.log('website from service client create: ' + website);
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);

        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");

        }


        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);

        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }


    }
})();