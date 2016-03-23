'use strict';
angular.module('main').controller('AvisosCtrl', function ($scope, $ionicModal) {
  $scope.avisos = angular.fromJson(localStorage.avisos);
  $ionicModal.fromTemplateUrl('filter-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal, results) {
    $scope.modal = modal;
    $scope.results = results;
  });
  $ionicModal.fromTemplateUrl('opciones-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (opcionesAviso) {
    $scope.opcionesAviso = opcionesAviso;
  });

  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
    $scope.opcionesAviso.hide();
  };

  $scope.openOptions = function (item) {
    $scope.opcionesAviso.show();
    console.log(item);
  };

  $scope.verAviso = function (item) {
    console.log(item);
  };
  
  $scope.onHold = function (item) {
    console.log(item);
  };
});
