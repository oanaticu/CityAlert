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