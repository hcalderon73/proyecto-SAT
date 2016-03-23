'use strict';
angular.module('main').controller('AvisoCtrl', function ($scope, $stateParams) {
  $scope.avisoId = $stateParams.avisoId;
  $scope.avisos = angular.fromJson(localStorage.avisos);
  $scope.detalleAviso = _.filter($scope.avisos, {Codigo: Number($stateParams.avisoId)});
  $scope.aviso = $scope.detalleAviso[0];




  $scope.lista = [
    {
      title: 'Cambiar Estados del Aviso',
      nombre: 'cambiar_estados',
      icon: 'ion-arrow-swap',
      url: 'sat.mapa',
      badge: null
    },
    {
      title: 'Mapa del Aviso',
      nombre: 'mapa_aviso',
      icon: 'ion-android-pin',
      url: 'sat.mapa',
      badge: null
    },
    {
      title: 'Nuevo Aviso relacionado',
      nombre: 'nuevo_avisos_relacionado',
      icon: 'ion-android-add-circle',
      url: 'sat.mapa',
      badge: null
    },
    {
      title: 'Alta Parte',
      nombre: 'alta_partes',
      icon: 'ion-android-clipboard',
      url: 'sat.mapa',
      badge: null
    },
    {
      title: 'Equipos/Revisiones',
      nombre: 'equipos_revisiones',
      icon: 'ion-android-people',
      url: 'sat.mapa',
      badge: null
    },
    {
      title: 'Gestión Documental',
      nombre: 'gestion_documental',
      icon: 'ion-android-camera',
      url: 'sat.gestion_documental'
    }
  ];


});
