angular.module('main')
.controller('HomeCtrl', function () {
    this.Avisos = JSON.parse(localStorage.avisos);
    this.numeroAvisos = Object.keys(this.Avisos).length;

    this.avisoSeleccionado = angular.fromJson(localStorage.avisoSeleccionado);




    this.lista = [
      {
        title: 'Avisos',
        nombre: 'avisos',
        icon: 'ion-android-alarm-clock',
        url: 'sat.avisos',
        badge: this.numeroAvisos
      },
      {
        title: 'Nuevo Aviso',
        nombre: 'nuevo_avisos',
        icon: 'ion-android-add-circle',
        url: 'sat.nuevo_aviso',
        badge: null
      },
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