angular.module('main')
.controller('HomeCtrl', function () {
    this.Avisos = JSON.parse(localStorage.avisos);
    this.numeroAvisos = Object.keys(this.Avisos).length;

    this.lista = [
      {
        title: 'Avisos',
        nombre: 'avisos',
        icon: 'ion-android-alarm-clock',
        url: 'sat.avisos',
        badge: this.numeroAvisos
      },
      /*{
        title: 'Cambiar Estados',
        nombre: 'cambiar_estados',
        icon: 'ion-arrow-swap',
        url: 'sat.mapa',
        badge: null
      },
      {
        title: 'Mapa de Avisos',
        nombre: 'mapa_avisos',
        icon: 'ion-android-pin',
        url: 'sat.mapa',
        badge: null
      },*/
      {
        title: 'Nuevo Aviso',
        nombre: 'nuevo_avisos',
        icon: 'ion-android-add-circle',
        url: 'sat.nuevo_aviso',
        badge: null
      },
      /*{
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
      },*/
      {
        title: 'Ver Pendientes',
        nombre: 'ver_pendientes',
        icon: 'ion-android-warning',
        url: 'sat.mapa',
        badge: null
      },
      {
        title: 'Ver Imputaciones',
        nombre: 'ver-imputaciones',
        icon: 'ion-android-list',
        url: 'sat.mapa'
      },
    ];

  
  

  
 
});