angular.module('app')
    .controller('AboutController', ['$scope', 'layoutservice', 'aboutservice',
        function ($scope, layoutservice, aboutservice) {
    
        layoutservice.SetSelectedPage('about');
        
        $scope.events = [];
        loadEvents();
        
        function loadEvents() {
            aboutservice.GetEvents().then(
                function (events) {
                    $scope.events = events;
                },
                function (error) {
                    toastr.error(error, 'Error');
                });
        }
}])