angular.module('app').directive('caAlertDetails', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/home/alertdetails.html',
        link: function(scope, element, attrs) {
            App.handleFancyBox(element);
        }
    };
})
    ;