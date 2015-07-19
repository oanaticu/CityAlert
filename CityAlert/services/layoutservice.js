angular.module('app')
.factory('layoutservice', ['$http', '$rootScope', function ($http, $rootScope) {
    var selectedPage = 'home';

    function setSelectedPage(page) {
        selectedPage = page;

        $rootScope.$broadcast('selectedPage.changed');
    }

    function getSelectedPage() {
        return selectedPage;
    }

    return {
        SetSelectedPage: setSelectedPage,
        GetSelectedPage: getSelectedPage
    };

}]);