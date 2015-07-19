angular.module('app')
.factory('staticdata', ['$http', '$q', function($http, $q) {
    var statusEnum = Object.freeze({ "Sent": 1, "Canceled": 2, "Received": 3, "InProgress": 4, "SentToAuth": 5, "NotSolved": 6, "WaitingConfirmation": 7, "Solved": 8 });
    var apiUrl = 'http://localhost/CityAlertWS/api/';

    return {
        StatusEnum: statusEnum,
        ApiUrl : apiUrl
    };

}]);