angular.module('app')
    .controller('ModalInstanceController', ['$scope', '$modalInstance', 'lat', 'lng', function ($scope, $modalInstance, lat, lng) {
    debugger;
        $scope.lat = lat;
        $scope.lng = lng;
  
        $scope.render = true;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }])