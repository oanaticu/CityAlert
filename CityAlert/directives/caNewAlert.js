angular.module('app')
    .directive('caNewAlert', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/home/newalert.html'
        };
    }).directive('caNewAlertMap', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/home/newalertmap.html'
        };
    })
    .directive('caAlertMapPopover', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.bind('click', function (event) {
                    //debugger;
                    $('#newAlertMap').modal('show');

                    setTimeout(function () {

                        google.maps.event.trigger($("#newAlertMap .ca-gmaps div")[0], 'resize');
                       
                    }, 800);
                    
                });

            }
        };
    });