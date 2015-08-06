angular.module('app')
    .controller('LayoutController', ['$rootScope','$scope', '$location', 'layoutservice', 'accountservice',
        function ($rootScope, $scope, $location, layoutservice, accountservice) {
        
            $scope.loginData = accountservice.GetUserData();
            $scope.userLoggedIn = accountservice.UserLoggedIn();
            $scope.selectedMenu = layoutservice.GetSelectedPage();

            $scope.$on('userData.changed', function () {
                $scope.loginData = accountservice.GetUserData();
                $scope.userLoggedIn = accountservice.UserLoggedIn();
            });

            $scope.$on('selectedPage.changed', function () {
                $scope.selectedMenu = layoutservice.GetSelectedPage();
            });

            $scope.fallbackLat = 44.426977;
            $scope.fallbackLong = 26.103564;
            $scope.newsletterEmail = "";

            $scope.subscribeToNewsletter = function() {

            };

        }])