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