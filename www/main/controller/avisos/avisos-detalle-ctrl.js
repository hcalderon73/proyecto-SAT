'use strict';
angular.module('main').controller('AvisoDetalleCtrl', function ($scope, $stateParams, $ionicModal) {

  $scope.avisoId = $stateParams.avisoId;
  $scope.avisos = angular.fromJson(localStorage.avisos);
  $scope.detalleAviso = _.filter($scope.avisos, {Codigo: Number($stateParams.avisoId)});
  $scope.aviso = $scope.detalleAviso[0];
  console.log($scope.aviso);
  $scope.aviso.FechaPrevista = new Date($scope.aviso.FechaPrevista);
  $scope.aviso.FechaRecepcion = new Date($scope.aviso.FechaRecepcion);

  /*MODAL DINAMICO*/
  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.verMovimiento = function () {
    $scope.openModal();
  };
  
});
