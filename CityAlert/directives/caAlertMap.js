angular.module('app').directive('caAlertMap', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/home/alertmap.html'
    };
}).directive('caMapPopover', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('click', function (event) {
                //debugger;
                $('#alertMap').modal('show');

                setTimeout(function () {

                    google.maps.event.trigger($("#alertMap .ca-gmaps div")[0], 'resize');

                }, 800);

            });

        }
    };
});