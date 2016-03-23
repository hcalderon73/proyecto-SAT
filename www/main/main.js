angular.module('main', [
  'ionic', 
  'ngCordova',
  'ui.router',
  'uiGmapgoogle-maps',
  'satellizer',
  'angularMoment'
  ])

.run(function($ionicPlatform, $auth, $state, amMoment) {


    amMoment.changeLocale('es');

    $ionicPlatform.ready(function() {
      if (localStorage.url === null || localStorage.lapsoSinc === null || !$auth.isAuthenticated()) {
        console.log("OFFLINE");
        $state.go('sat.config'); // go to login
      } else {
        console.log("ONLINE");
        $state.go('sat.home');
      }

      if (ionic.Platform.isAndroid()) {
        console.log('usas un android !');
      }

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $provide) {

  $stateProvider
  .state('sat', {
    url: '/sat',
    abstract: true,
    templateUrl: 'main/templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('sat.home', {
    url: '^/home',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/home/home.html',
        controller: 'HomeCtrl as ctrl'
      }
    }
  })
  .state('sat.mapa', {
    url: '^/mapa',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/mapa/mapa.html',
        controller: 'MapaCtrl as model'
      }
    }
  })
  .state('sat.config', {
    url: '^/config',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/config/config.html',
        controller: 'ConfigCtrl as ctrl'
      }
    }
  })
  .state('sat.avisos', {
    url: '^/avisos',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/avisos.html',
        controller: 'AvisosCtrl as ctrl'
      }
    }
  })
  .state('sat.detalle', {
    url: '^/avisos/detalle/{avisoId}',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/detalle.html',
        controller: 'AvisoDetalleCtrl as ctrl'
      }
    }
  })
  .state('sat.aviso', {
    url: '^/aviso/{avisoId}',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/aviso/aviso.html',
        controller: 'AvisoCtrl as ctrl'
      }
    }
  })
  .state('sat.gestion_documental', {
    url: '^/aviso/gestion_documental',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/aviso/gestion_documental.html',
        controller: 'GestionDocumentalCtrl as ctrl'
      }
    }
  })
  .state('sat.descarga', {
    url: '/descarga',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/descarga/descarga.html',
        controller: 'DescargaCtrl as ctrl'
      }
    }
  });
}); 

