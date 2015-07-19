angular.module('app').directive('caSlider', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/slider.html',
        link: function (scope, element, attrs) {
            RevosliderInit.initRevoSlider();
        }
    };
});