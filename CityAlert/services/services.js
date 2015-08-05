///#source 1 1 /services/accountservice.js
angular.module('app')
.factory('accountservice', ['$rootScope','$http', '$q', 'staticdata', 'requestservice', '$cookies', function ($rootScope, $http, $q, staticdata, req, $cookies) {
    var loginUrl = staticdata.ApiUrl + 'Contact/Login';
    var createAccountUrl = staticdata.ApiUrl + 'Contact/UpdateContact';
    var recoverPassUrl = staticdata.ApiUrl + 'Contact/RecoverPassword';

    function getUserData () {
        var user = $cookies.get('user');
        if (user)
            return JSON.parse(user);
        else
            return {};

    };
    function setUserData (user) {
        $cookies.putObject('user', user);
        $rootScope.$broadcast('userData.changed');
    };

    function userLoggedIn() {
        var user = getUserData();

        return !_.isEmpty(user);
    };

   function login(data) {
        var request = $http.post(loginUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
   }

   function createAccount(data) {
       var request = $http.post(createAccountUrl, data);

       return (request.then(req.HandleSuccess, req.HandleError));
   }

   function recoverPassword(data)
    {
       var request = $http.post(recoverPassUrl, data);

       return (request.then(req.HandleSuccess, req.HandleError));
    }


    
    return {
       Login: login,
       CreateAccount: createAccount,
       GetUserData: getUserData,
       UserLoggedIn: userLoggedIn,
       SetUserData: setUserData,
       RecoverPassword: recoverPassword
    };
}]);
///#source 1 1 /services/alertservice.js
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

    function addAlertNoPhoto(data) {
        var request = $http.post(addAlertNoPhotoUrl, data);

        return (request.then(req.HandleSuccess, req.HandleError));
    }

    return {
        AddAlertUrl: addAlertUrl,
        GetCategories: getCategories,
        GetRecentAlerts: getRecentAlerts,
        AddAlertNoPhoto: addAlertNoPhoto
    };
}]);
///#source 1 1 /services/layoutservice.js
angular.module('app')
.factory('layoutservice', ['$http', '$rootScope', function ($http, $rootScope) {
    var selectedPage = 'home';

    function setSelectedPage(page) {
        selectedPage = page;

        $rootScope.$broadcast('selectedPage.changed');
    }

    function getSelectedPage() {
        return selectedPage;
    }

    return {
        SetSelectedPage: setSelectedPage,
        GetSelectedPage: getSelectedPage
    };

}]);
///#source 1 1 /services/requestservice.js
angular.module('app')
.factory('requestservice', ['$q', function($q) {
    function handleError(response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {

            return ($q.reject("O eroare necunoscuta a aparut"));

        }

        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));

    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response, callback) {

        if (response.data && response.data.Error && response.data.Error != '')
            return ($q.reject(response.data.Error));

        if (callback)
            return callback(response.data);
        else
            return (response.data);

    }

    return {
        HandleError: handleError,
        HandleSuccess: handleSuccess
    };

}]);
///#source 1 1 /services/staticdata.js
angular.module('app')
.factory('staticdata', ['$http', '$q', function($http, $q) {
    var statusEnum = Object.freeze({ "Sent": 1, "Canceled": 2, "Received": 3, "InProgress": 4, "SentToAuth": 5, "NotSolved": 6, "WaitingConfirmation": 7, "Solved": 8 });
    var apiUrl = 'http://localhost/CityAlertWS/api/';

    return {
        StatusEnum: statusEnum,
        ApiUrl : apiUrl
    };

}]);
///#source 1 1 /services/util.js
angular.module('app')
.factory('util', ['staticdata', function (staticdata) {

    function getStatusName(id) {
        var result = "";
        switch (id) {
            case staticdata.StatusEnum.Sent:
                result = "Trimisa";
                break;
            case staticdata.StatusEnum.Canceled:
                result = "Anulata";
                break;
            case staticdata.StatusEnum.Received:
                result = "Receptionata";
                break;
            case staticdata.StatusEnum.InProgress:
                result = "In lucru";
                break;
            case staticdata.StatusEnum.SentToAuth:
                result = "Trimisa autoritatilor";
                break;
            case staticdata.StatusEnum.NotSolved:
                result = "Nerezolvata";
                break;
            case staticdata.StatusEnum.WaitingConfirmation:
                result = "In asteptare confirmare";
                break;
            case staticdata.StatusEnum.Solved:
                result = "Rezolvata";
                break;
        }
        return result;
    };


    function getStatusBgColor(id) {
        var result = "gray";
        switch (id) {
            case staticdata.StatusEnum.Sent:
                result = "#e2e2e2";
                break;
            case staticdata.StatusEnum.Canceled:
                result = "#662d8f";
                break;
            case staticdata.StatusEnum.Received:
                result = "#0071ba";
                break;
            case staticdata.StatusEnum.InProgress:
                result = "#df0613";
                break;
            case staticdata.StatusEnum.SentToAuth:
                result = "#f9bf00";
                break;
            case staticdata.StatusEnum.NotSolved:
                result = "#808080";
                break;
            case staticdata.StatusEnum.WaitingConfirmation:
                result = "#ef5a24";
                break;
            case staticdata.StatusEnum.Solved:
                result = "#39b34a";
                break;
        }
        return result;
    }

    return {
        GetStatusName: getStatusName,
        GetStatusBgColor: getStatusBgColor
    };

}]);
