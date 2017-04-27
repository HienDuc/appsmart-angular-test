'use strict';
app
  .controller('MainCtrl', ['$scope', '$state', '$window','$translate', function($scope, $state, $window,$translate) {

    $scope.main = {
      title: 'Music App',
      appName: 'Music App',
      settings: {
        navbarHeaderColor: 'scheme-default',
        sidebarColor: 'scheme-default',
        brandingColor: 'scheme-default',
        activeColor: 'default-scheme-color',
        headerFixed: true,
        asideFixed: true,
        rightbarShow: false
      }
    };

      $scope.changeLanguage = function (langKey) {
          $translate.use(langKey);
          $scope.currentLanguage = langKey;
      };
      $scope.currentLanguage = $translate.proposedLanguage() || $translate.use();

  }])
  .config(['$provide','tagsInputConfigProvider', function($provide,tagsInputConfigProvider) {
      tagsInputConfigProvider
          .setDefaults('tagsInput', {
              placeholder: 'New tag',
              minLength: 1,
              addOnEnter: true
          })
  }]);
