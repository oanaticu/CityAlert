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