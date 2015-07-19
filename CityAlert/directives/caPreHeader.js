angular.module('app').directive('caPreHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/preheader.html',
        link: function (scope, element, attrs) {
            
            Layout.initFixHeaderWithPreHeader(); /* Switch On Header Fixing (only if you have pre-header) */
            App.changeMenuBehavior();
        }
    };
});