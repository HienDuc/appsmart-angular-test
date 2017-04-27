'use strict';

app
    .controller('NavCtrl',['$scope','$state', function ($scope,$state) {
        $scope.oneAtATime = false;

        $scope.status = {
            isFirstOpen: true,
            isSecondOpen: true,
            isThirdOpen: true,
            isFirstOpenAdmin: true,
            isSecondOpenAdmin: true,
            isThirdOpenAdmin: true
        };
    }]);
