angular.module('main').controller('MenuCtrl', function ($scope, $auth, $cordovaDialogs, $state) {
  $scope.isAuthenticated = function () {
    return $auth.isAuthenticated();
  };
});
