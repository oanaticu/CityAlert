angular.module('app')
.factory('contactservice', ['$rootScope','$http', '$q', 'staticdata', 'requestservice', '$cookies', function ($rootScope, $http, $q, staticdata, req, $cookies) {
    var sendFAQUrl = staticdata.ApiUrl + 'Contact/SendFAQ';
    var subscribeToNewsletterUrl = staticdata.ApiUrl + 'Contact/SubscribeToNewsletter';
    var getFAQUrl = staticdata.ApiUrl + 'Contact/GetFAQs';
    
    function sendFAQ(data) {
        var request = $http.post(sendFAQUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
    }
    
    function subscribeToNewsletter(data) {
        var request = $http.post(subscribeToNewsletterUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
    }
    
    function getFAQs() {
            var request = $http.get(getFAQUrl);

            return (request.then(req.HandleSuccess, req.HandleError));
    }

    return {
        SendFAQ: sendFAQ,
        SubscribeToNewsletter: subscribeToNewsletter,
        GetFAQs: getFAQs
    };
}]);