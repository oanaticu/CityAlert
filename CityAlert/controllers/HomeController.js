angular.module('app')
    .controller('HomeController', [
        '$scope', 'alertservice', 'util', 'layoutservice', 'accountservice', 'toastr', 'FileUploader', '$geolocation',
        function ($scope, alertservice, util, layoutservice, accountservice, toastr, FileUploader, $geolocation) {
            $scope.alerts = [];
            $scope.alertDetail = {};
            $scope.uploader = new FileUploader({
                url: alertservice.AddAlertUrl
            });
            $scope.addAlertData = {};

            $scope.categoriesHierarchy = [];
            $scope.categories = [];
            $scope.subcategories = [];

            $scope.hasAlertDetails = false;
            $scope.codeSearch = '';
            $scope.alertMarkers = [];

            // initialization
            layoutservice.SetSelectedPage('home');
            resetAlert();
            loadAlerts();
            loadCategories();


            $scope.$on('userData.changed', function () {
                loadAlerts();
            });
            $scope.$watch('codeSearch', function () {
                loadAlertDetail($scope.codeSearch);
            });
            $scope.$watch('newAlert.categoryId', function (newValue, oldValue) {
                loadSubCategories(newValue);
            });


            // gmaps actions
            $scope.$on('mapInitialized', function (event, map) {
                $geolocation.getCurrentPosition().then(function (position) {
                    $scope.newAlert.lat = $scope.newAlert.userLat = position.coords.latitude;
                    $scope.newAlert.long = $scope.newAlert.userLong = position.coords.longitude;

                    var location = new google.maps.LatLng($scope.newAlert.lat, $scope.newAlert.long);
                    $scope.marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });
                    setAddress(location);
                    map.setCenter(location);

                });

                if (map.id == "mNewAlert") {
                    google.maps.event.addListener(map, 'click', function (event) {
                        placeMarker(event.latLng);
                        setAddress(event.latLng);
                    });
                }
                if (map.id == "mAlert") {
                    placeMarkers();
                }

            });
            function placeMarkers() {
                for (var i = 0; i < $scope.alertMarkers.length; i++) {
                    $scope.alertMarkers[i].setMap(null);
                }
                $scope.alertMarkers = [];

                $scope.alertMarkers = _.map($scope.alerts, function (elem) {
                    return new google.maps.Marker({
                        position: new google.maps.LatLng(elem.Lat, elem.Long),
                        map: $scope.maps.mAlert
                    });
                });

            }
            function placeMarker(location) {

                if ($scope.marker == undefined) {
                    $scope.marker = new google.maps.Marker({
                        position: location,
                        map: $scope.maps.mNewAlert
                    });
                }
                else {
                    $scope.marker.setPosition(location);
                }


            }


            // private methods
            function resetAlert() {
                $scope.newAlert = {
                    isPublic: false,
                    sendFeedback: false,
                    //isAddressModified: false,
                    photo: {}
                };
                $scope.uploadPhotoStyle = {
                    'background-image': 'url(img/camera-icon.png)'
                };
            }
            function resetAddress() {
                $scope.newAlert.street = undefined;
                $scope.newAlert.streetNo = undefined;
                $scope.newAlert.city = undefined;
            }
            function setAddress(latlng) {
                $scope.newAlert.lat = latlng.A;
                $scope.newAlert.long = latlng.F;

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            for (var i in results[0].address_components) {
                                if (results[0].address_components[i].types[0] == "route")
                                    $scope.newAlert.street = results[0].address_components[i].long_name;
                                if (results[0].address_components[i].types[0] == "street_number")
                                    $scope.newAlert.streetNo = results[0].address_components[i].long_name;
                                if (results[0].address_components[i].types[0] == "locality")
                                    $scope.newAlert.city = results[0].address_components[i].long_name;
                                if (results[0].address_components[i].types[0] == "sublocality_level_1" && results[0].address_components[i].long_name.indexOf('Sector') != -1) {
                                    var sect = results[0].address_components[i].long_name;
                                    if (sect.length > 0)
                                        $scope.newAlert.city += ', ' + sect;
                                }
                                //$scope.newAlert.isAddressModified = false;   
                            }
                        } else {
                            toastr.error('Nu s-a gasit niciun rezultat!', 'Error');
                            resetAddress();
                        }
                    } else {
                        toastr.error('Nu se poate determina locatia!', 'Error');
                        resetAddress();
                    }

                    $scope.$apply();
                });
            }

            function loadAlerts() {
                var call = alertservice.GetRecentAlerts();

                call.then(
                    function (alerts) {
                        alerts.forEach(function (element, index) {
                            element.Image = util.GetImage(element.Image);

                            element.Color = element.StatusColor;
                            element.Status = element.StatusName;
                            
                            var date = new Date(element.CreatedOn);
                            element.DateDisplay = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                        });

                        $scope.alerts = alerts;
                        placeMarkers();
                        loadAlertDetail();
                    },
                    function (error) {
                        toastr.error(error, 'Error');
                    }
                );
            }

            function loadAlertDetail(code) {
                var alerts = $scope.alerts;

                if (code) {
                    alerts = _.filter(alerts, function (alert) { return alert.Code.indexOf(code) > -1; });
                }

                if (alerts.length > 0) {
                    var sortedList = _.sortBy(alerts, function (elem) { return new Date(elem.ModifiedOn); });
                    $scope.alertDetail = _.last(sortedList);
                    $scope.hasAlertDetails = true;
                } else {
                    $scope.hasAlertDetails = false;
                }

            }

            function loadSubCategories(categoryId) {
                if (categoryId) {
                    var parent = _.find($scope.categoriesHierarchy, function (elem) { return elem.Id == categoryId; });
                    $scope.subcategories = parent.SubCategories;
                    if (parent.SubCategories[0]) {
                        //$scope.newAlert.subCategoryId = parent.SubCategories[0].Id;
                    } else {
                        //$scope.newAlert.subCategoryId = undefined;
                    }
                }

            }

            function loadCategories() {
                alertservice.GetCategories()
                    .then(
                        function (categories) {
                            if (categories && categories.length > 0) {
                                $scope.categoriesHierarchy = categories;

                                $scope.categories = categories;
                                //$scope.newAlert.categoryId = categories[0].Id;

                                loadSubCategories($scope.newAlert.categoryId);
                            }

                        },
                        function (error) {
                            toastr.error(error, 'Error');
                        });

            }

            // uploader configuration
            $scope.uploader.filters.push({
                name: 'imageFilter',
                fn: function (item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
            $scope.uploader.onAfterAddingFile = function (item) {
                if ($scope.uploader.queue.length > 1) {
                    $scope.uploader.removeFromQueue(0);
                }

                $scope.newAlert.photo.name = item.file.name;
                $scope.newAlert.photo.size = item.file.size;
                $scope.newAlert.photo.type = item.file.type;

                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.uploadPhotoStyle = {
                        'background-image': 'url(' + e.target.result + ')'
                    };
                    $scope.$apply();
                };
                reader.readAsDataURL(item._file);
            };
            $scope.uploader.onBeforeUploadItem = function (item) {

                item.formData.push($scope.addAlertData);
            };
            $scope.uploader.onSuccessItem = function (item, response, status, headers) {
                if (item.Error) {
                    toastr.error(item.Error, 'Error');
                } else {
                    loadAlerts();
                    resetAlert();
                    toastr.success('Alerta a fost inregistrata cu succes', 'Succes');
                }

            };
            $scope.uploader.onErrorItem = function (item, response, status, headers) {
                if (
                    !angular.isObject(response.data) ||
                        !response.data.message
                ) {

                    toastr.error('A aparut o eroare la inregistrarea alertei', 'Error');

                }

                // Otherwise, use expected error message.
                toastr.error(response.data.message, 'Error');
            };

            // user actions
            $scope.addAlert = function () {
                if (accountservice.UserLoggedIn()) {

                    var hasAddress = $scope.newAlert.lat
                        && $scope.newAlert.long;

                    var isOk = hasAddress
                        && $scope.newAlert.userLat
                        && $scope.newAlert.userLong
                        && $scope.newAlert.description
                        && $scope.newAlert.subCategoryId;

                    var hasPhoto = $scope.uploader.queue.length > 0;

                    if (!isOk) {
                        var message = 'Toate campurile sunt obligatorii. ';

                        toastr.error(message, 'Error');

                    } else {
                        $scope.addAlertData = {
                            AddressLatitude: $scope.newAlert.lat,
                            AddressLongitude: $scope.newAlert.long,
                            CategoryId: $scope.newAlert.subCategoryId,
                            ContactId: accountservice.GetUserData().ContactId,
                            Description: $scope.newAlert.description,
                            //IsAddressModified: ($scope.newAlert.isAddressModified) ? 1 : 0,
                            PhotoName: $scope.newAlert.photo.name,
                            IsPublic: ($scope.newAlert.isPublic) ? 1 : 0,
                            SendFeedback: ($scope.newAlert.sendFeedback) ? 1 : 0,
                            City: $scope.newAlert.city,
                            StreetName: $scope.newAlert.street,
                            StreetNo: $scope.newAlert.streetNo,
                            UserLatitude: $scope.newAlert.userLat,
                            UserLongitude: $scope.newAlert.userLong
                        };


                        if (hasPhoto) {
                            $scope.uploader.uploadAll();
                        } else {
                            alertservice.AddAlertNoPhoto($scope.addAlertData).then(
                                function (response) {
                                    loadAlerts();
                                    resetAlert();
                                    toastr.success('Alerta a fost inregistrata cu succes', 'Succes');
                                },
                                function (error) {
                                    toastr.error(error, 'Error');
                                });

                        }
                    }


                } else {
                    toastr.info('Doar utilizatorii logati pot inregistra alerte', 'Info');
                }

            };
            $scope.addressChanged = function () {
                //$scope.newAlert.isAddressModified = true;
            };
        }
    ]);