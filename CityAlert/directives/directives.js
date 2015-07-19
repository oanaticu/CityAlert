///#source 1 1 /directives/caAlertDetails.js
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
///#source 1 1 /directives/caAlertList.js
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
///#source 1 1 /directives/caAlertMap.js
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
///#source 1 1 /directives/caNewAlert.js
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
///#source 1 1 /directives/caFooter.js
angular.module('app').directive('caFooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/footer.html'
    };
});
///#source 1 1 /directives/caHeader.js
angular.module('app').directive('caHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/header.html'
    };
});
///#source 1 1 /directives/caPreFooter.js
angular.module('app').directive('caPreFooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/prefooter.html'
    };
});
///#source 1 1 /directives/caPreHeader.js
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
///#source 1 1 /directives/caSlider.js
angular.module('app').directive('caSlider', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/slider.html',
        link: function (scope, element, attrs) {
            RevosliderInit.initRevoSlider();
        }
    };
});
///#source 1 1 /directives/caUtilitary.js
angular.module('app').directive('caUtilitary', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/shared/utilitary.html'
    };
});
