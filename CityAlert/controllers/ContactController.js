angular.module('app')
    .controller('ContactController', ['$scope', 'layoutservice', 'contactservice', 'toastr',
        function ($scope, layoutservice, contactservice, toastr) {
        layoutservice.SetSelectedPage('contact');

        $scope.lat = 44.4268;
        $scope.lng = 26.1025;
        $scope.faq = {};
        $scope.faqList = [];
        

        loadFAQs();
        

        $scope.sendFAQ = function () {
            var data = {
                Name: $scope.faq.name,
                Email: $scope.faq.email,
                Message: $scope.faq.message
            };

            contactservice.SendFAQ(data).then(
                function (resp) {
                    toastr.success('Intrebarea a fost trimisa cu succes', 'Succes');
                },
                function (error) {
                     toastr.error(error, 'Error');
                 });
        };

        function loadFAQs() {
            contactservice.GetFAQs().then(
                function (faqs) {
                    $scope.faqList = faqs;
                },
                function (error) {
                     toastr.error(error, 'Error');
                 });
        }
        

    }])