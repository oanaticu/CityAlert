angular.module('app')
    .controller('LayoutController', ['$rootScope','$scope', '$location','toastr', 'layoutservice', 'accountservice', 'contactservice',
        function ($rootScope, $scope, $location, toastr,layoutservice, accountservice, contactservice) {
        
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
                contactservice.SubscribeToNewsletter({ Email: $scope.newsletterEmail }).then(
                function (resp) {
                    toastr.success('Inregistrarea a fost facuta cu succes', 'Succes');
                },
                function (error) {
                    toastr.error(error, 'Error');
                });
            };

        }])