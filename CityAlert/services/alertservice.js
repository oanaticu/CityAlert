angular.module('app')
.factory('alertservice', ['$http', '$q', 'staticdata', 'requestservice', '_', function ($http, $q, staticdata, req, _ ) {
    
    var getCategoryServiceURL = staticdata.ApiUrl + 'Dictionary/GetCategories';
    var getRecentAlertURL = staticdata.ApiUrl + 'Case';
    var getMyAlertURL = staticdata.ApiUrl + 'Case/GetByUser';
    var addAlertUrl = staticdata.ApiUrl + 'Case/AddAlert';
    var addAlertNoPhotoUrl = staticdata.ApiUrl + 'Case/AddAlertNoPhoto';

    function getCategories() {
        var request = $http({
            method: "get",
            url: getCategoryServiceURL,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return (request.then(req.HandleSuccess,req.HandleError));
    };

    function getRecentAlerts() {
        var request = $http({
            method: "get",
            url: getRecentAlertURL,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        return (request.then(req.HandleSuccess, req.HandleError));
    };

    function getMyAlerts(id) {
        var request = $http({
            method: "get",
            url: getMyAlertURL+'/'+id,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        return (request.then(req.HandleSuccess, req.HandleError));
    };

    function addAlertNoPhoto(data) {
        var request = $http.post(addAlertNoPhotoUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
    }

    return {
        AddAlertUrl: addAlertUrl,
        GetCategories: getCategories,
        GetRecentAlerts: getRecentAlerts,
        GetMyAlerts: getMyAlerts,
        AddAlertNoPhoto: addAlertNoPhoto
    };
}]);