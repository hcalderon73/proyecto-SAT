'use strict';
angular.module('main').controller('AvisoDetalleCtrl', function ($scope, $stateParams) {
  
  $scope.avisoId = $stateParams.avisoId;
  $scope.avisos = angular.fromJson(localStorage.avisos);
  $scope.avisoSelecionado = _.filter($scope.avisos, {Codigo: Number($stateParams.avisoId)});
  $scope.aviso = $scope.avisoSelecionado[0];
  console.log($scope.aviso);
  
});
