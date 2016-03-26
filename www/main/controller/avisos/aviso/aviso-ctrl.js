'use strict';
angular.module('main').controller('AvisoCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup) {
  $scope.avisoId = $stateParams.avisoId;
  $scope.avisos = angular.fromJson(localStorage.avisos);
  $scope.detalleAviso = _.filter($scope.avisos, {Codigo: Number($stateParams.avisoId)});
  localStorage.avisoSeleccionado = angular.toJson($scope.detalleAviso);
  $scope.aviso = $scope.detalleAviso[0];
  $scope.estados = angular.fromJson(localStorage.estados);
  $scope.estados = _.filter($scope.estados, function(element){
    return element.Publicable ==  true;
  })

  $scope.showPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<textarea rows="5" ng-model="data.wifi" placeholder="Ingrese un comentario"></textarea>',
      title: 'Confirme la selección del Estado ' +  angular.toJson($scope.estadoSeleccionado[0].Descripcion),
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Confirmar</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
  };

  /*MODAL DINAMICO*/
  $ionicModal.fromTemplateUrl('estados-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.selectEstado = function (idEstado) {

    var nuevoEstado = _.filter($scope.estados, function(value) {
      return value.EstadoAviso == idEstado;
    })
    $scope.estadoSeleccionado = nuevoEstado;
    $scope.showPopup();

  };



  /*Carga estado para el modal cambio estado.*/

  $scope.lista = [
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
      url: 'sat.aviso_relacionado',
      badge: null
    },
    {
      title: 'Alta Parte',
      nombre: 'alta_partes',
      icon: 'ion-android-clipboard',
      url: 'sat.alta_partes',
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
      url: 'sat.gestion_documental',
      badge: null
    },
    {
      title: 'Cancelar Seleccion',
      nombre: 'cancelar_seleccion',
      icon: 'ion-android-cancel',
      url: 'sat.gestion_documental',
      badge: null
    }
  ];




});
