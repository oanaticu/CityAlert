angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html' /*,
                controller: 'HomeController'*/
            })
            .when('/about', {
                templateUrl: 'views/about.html' /*,
                controller: 'AboutController'*/
            })
            .when('/contact', {
                templateUrl: 'views/contact.html'/*,
                    controller: 'ContactController'*/
            })
            .when('/recoverpass', {
                templateUrl: 'views/recoverpass.html'/*,
                    controller: 'ContactController'*/
            })
        .otherwise({ redirectTo: '/home' });
    }])
    .config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        autoDismiss: false,
        closeButton: true,
        //closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        maxOpened: 0,
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        progressBar: false,
        tapToDismiss: true,
        target: 'body',
        //templates: {
        //    toast: 'directives/toast/toast.html',
        //    progressbar: 'directives/progressbar/progressbar.html'
        //},
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});