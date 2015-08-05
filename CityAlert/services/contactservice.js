angular.module('app')
.factory('contactservice', ['$rootScope','$http', '$q', 'staticdata', 'requestservice', '$cookies', function ($rootScope, $http, $q, staticdata, req, $cookies) {
    var sendFAQUrl = staticdata.ApiUrl + 'Contact/SendFAQ';
    
    function sendFAQ(data) {
        debugger;
        var request = $http.post(sendFAQUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
    }

    return {
        SendFAQ: sendFAQ
    };
}]);