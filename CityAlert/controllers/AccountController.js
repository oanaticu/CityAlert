angular.module('app')
    .controller('AccountController', ['$scope', 'accountservice', 'toastr',
        function ($scope, accountservice, toastr) {
            $scope.existingAccount = {};
            $scope.newAccount = {};
            $scope.recoverPass = {};


            $scope.login = function () {

                accountservice.Login($scope.existingAccount).then(
                function (loginData) {
                    var user = {
                        ContactId: loginData.ContactId,
                        FirstName: loginData.FirstName,
                        LastName: loginData.LastName,
                        Telephone: loginData.Telephone,
                        Email: loginData.Email
                    };

                    accountservice.SetUserData(user);
                },
                function (error) {
                    toastr.error(error, 'Error');
                });
            };

            $scope.createAccount = function () {

                accountservice.CreateAccount($scope.newAccount).then(
                function (createAccountData) {
                    var user = {
                        ContactId: createAccountData.ContactId,
                        FirstName: $scope.newAccount.FirstName,
                        LastName: $scope.newAccount.LastName,
                        Telephone: $scope.newAccount.Telephone,
                        Email: $scope.newAccount.Email
                    };

                    accountservice.SetUserData(user);
                },
                function (error) {
                    toastr.error(error, 'Error');
                });
            };

            $scope.logout = function() {
                accountservice.SetUserData({});
            };

            $scope.recoverPassword = function() {
                accountservice.RecoverPassword($scope.recoverPass)
                    .then(
                function (data) {
                    if (data.Message)
                        toastr.success(data.Message);
                    else
                        toastr.error('Error');
                },
                function (error) {
                    toastr.error(error, 'Error');
                });
            };


            //$scope.$parent.refreshUserData();

        }])