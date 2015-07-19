angular.module('app')
    .controller('ContactController', ['$scope', 'layoutservice', function ($scope, layoutservice) {
        layoutservice.SetSelectedPage('contact');

    $scope.lat = 44.4268;
    $scope.lng = 26.1025;

}])