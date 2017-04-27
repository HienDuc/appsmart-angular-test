'use strict';
app.controller('AlbumsCtrl', ['$scope', '$http', '$state', '$stateParams', 'cfpLoadingBar', 'Utils',
    function ($scope, $http, $state, $stateParams, cfpLoadingBar, Utils) {
        $scope.albums = [];
        $scope.albumsObject = {};
        var linkGet = "http://localhost:8000/albums/all";
        var getAllAlbums = function (link) {
            $http.get(link).success(function (data, status, headers, config) {
                $scope.albumsObject = data;
                $scope.albums = Utils.arrayValues(data);
            }).error(function (data, status, headers, config) {
                console.log('data error');
            }).then(function (result) {});
        }
        getAllAlbums(linkGet);
    }
]).controller('AlbumsListCtrl', ['$scope', '$http', '$filter', '$stateParams', 'ngTableParams', 'toastr', 'Utils', '$mdDialog',
    function ($scope, $http, $filter, $stateParams, ngTableParams, toastr, Utils, $mdDialog) {
        // Delete CRUD operation
        $scope.delete = function (ev, album) {
            var confirm = $mdDialog.confirm().title('Do you really want to delete this album ?').ariaLabel('warning').targetEvent(ev).ok('Delete').cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:8000/albums/delete/' + album.key,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                }).then(function (response) {
                    if (album) {
                        var index = $scope.albums.indexOf(album);
                        $scope.albums.splice(index, 1);
                    }
                    $scope.tableParams.reload();
                }, function (rejection) {
                    console.log(rejection.data);
                });
            }, function () {});
        };
        //////////////////////////////////////////
        //************ Table Settings **********//
        //////////////////////////////////////////
        // Initialize table
        // watch data in scope, if change reload table
        $scope.$watchCollection('albums', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.tableParams.reload();
            }
        });
        $scope.$watch('searchText', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.tableParams.reload();
            }
        });
        ///////////////////////////////////////////// *watch data in scope, if change reload table
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                name: 'asc' // initial sorting
            }
        }, {
            total: $scope.albums.length, // length of data
            getData: function ($defer, params) {
                // use build-in angular filter
                var albumData = params.sorting() ? $filter('orderBy')($scope.albums, params.orderBy()) : $scope.albums;
                albumData = $filter('filter')(albumData, $scope.searchText);
                params.total(albumData.length);
                $defer.resolve(albumData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
        ////////////////////////////////////////// *Initialize table
    }
]).controller('NewAlbumCtrl', ['$scope', 'toastr', '$http', '$state', '$filter', 'cfpLoadingBar', 'Utils',
    function ($scope, toastr, $http, $state, $filter, cfpLoadingBar, Utils) {
        $scope.loading = false;
        $scope.albumEntry = {};
        $scope.album = {};
        $scope.editing = false;
        // Submit operation
        $scope.ok = function () {
            cfpLoadingBar.start();
            $scope.loading = true;
            $scope.albumEntry = {
                title: $scope.album.title,
                artist: $scope.album.artist,
                country: $scope.album.country,
                price: $scope.album.price,
                year: $scope.album.year
            };
            var config = {
                headers: {
                    'Content-Type': "application/json"
                }
            }
            console.log($scope.albumEntry);
            $http.post("http://localhost:8000/albums/add", $scope.albumEntry, config).success(function (data, status, headers, config) {
                toastr.success('Album Added', 'Album has been created');
                $state.go('app.albums.list', {}, {
                    reload: true
                });
                cfpLoadingBar.complete();
            }).error(function (data, status, headers, config) {});
        };
        $scope.dimensions = {
            screenshot: {
                w: 100,
                h: 100
            }
        };
        $scope.onLoad9 = function (e, reader, file, fileList, fileObjects, fileObj) {
            Utils.resizeImage("canvas9", fileObj.base64, file.type, $scope.dimensions["screenshot"].w, $scope.dimensions["screenshot"].h).then(function (resizedBase64) {
                $scope.album.logoUrl = resizedBase64;
            }, function (error) {
                //console.log(error)
            })
        };
        /////////////////////// *Submit operation
    }
]).controller('EditAlbumCtrl', ['$scope', '$http', 'toastr', '$stateParams', '$state', '$filter', 'cfpLoadingBar', 'Utils',
    function ($scope, $http, toastr, $stateParams, $state, $filter, cfpLoadingBar, Utils) {
        $scope.loading = false;
        $scope.editing = true;
        $scope.albumEntry = {};
        var albumId = $stateParams.albumId;
        var linkGet = "http://localhost:8000/albums/all";
        var getAllAlbums = function (link) {
            $http.get(link).success(function (data, status, headers, config) {
                $scope.albumsObject = data;
                $scope.album = $scope.albumsObject[albumId];
            }).error(function (data, status, headers, config) {
                console.log('data error');
            }).then(function (result) {});
        }
        getAllAlbums(linkGet);
        $scope.ok = function () {
            cfpLoadingBar.start();
            $scope.loading = true;
            $scope.albumEntry = {
                title: $scope.album.title,
                artist: $scope.album.artist,
                country: $scope.album.country,
                price: $scope.album.price,
                year: $scope.album.year
            };
            var config = {
                headers: {
                    'Content-Type': "application/json"
                }
            }
            console.log($scope.albumEntry);
            $http.post("http://localhost:8000/albums/update/" + albumId, $scope.albumEntry, config).success(function (data, status, headers, config) {
                toastr.success('Album Edited', 'Album has been changed');
                $state.go('app.albums.list', {}, {
                    reload: true
                });
                cfpLoadingBar.complete();
            }).error(function (data, status, headers, config) {});
        };
        /////////////////////// *Submit operation
    }
]).controller('ShowAlbumCtrl', ['$scope', 'toastr', '$state', '$stateParams',
    function ($scope, toastr, $state, $stateParams) {}
]);