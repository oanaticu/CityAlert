angular.module('app')
    .controller('AboutController', ['$scope', 'layoutservice', function ($scope, layoutservice) {
    
        layoutservice.SetSelectedPage('about');
}])