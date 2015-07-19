angular.module('app')
    .directive('caAlertList', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/home/alertlist.html'
        };
    })
    .directive('caAlertListDetail', function () {
            return function (scope, element, attrs) {
                App.handleFancyBox(element);
        };
    });