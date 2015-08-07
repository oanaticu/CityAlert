angular.module('app')
.factory('aboutservice', ['$rootScope', '$http', '$q', 'staticdata', 'requestservice',
    function ($rootScope, $http, $q, staticdata, req) {
    var getEventsUrl = staticdata.ApiUrl + 'Contact/GetEvents';
    
    function getEvents() {
        var request = $http.get(getEventsUrl);

        return (request.then(req.HandleSuccess, req.HandleError));
    }

    return {
        GetEvents: getEvents
    };
}]);