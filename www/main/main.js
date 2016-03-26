angular.module('main', [
  'ionic', 
  'ngCordova',
  'ui.router',
  'uiGmapgoogle-maps',
  'satellizer',
  'angularMoment',
  'ionic-datepicker',
  'ionic-timepicker'
  ])

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Ok',
      todayLabel: 'Hoy',
      closeLabel: 'Cerrar',
      mondayFirst: false,
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })


.run(function($ionicPlatform, $auth, $state, amMoment, $rootScope, $cordovaSQLite, $testService) {




   /* $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        console.log(toState.name);
        console.log(toParams);
        console.log(fromState.name);
        console.log(fromParams);
      });
*/
    amMoment.changeLocale('es');

    $ionicPlatform.ready(function() {
      if (localStorage.url === null || localStorage.lapsoSinc === null || !$auth.isAuthenticated()) {
        console.log("OFFLINE");
        $state.go('sat.config'); // go to login
      } else {
        console.log("ONLINE");
        $testService.loginInfo();
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

      var dbOptions = {
        name: 'Sat',
        tables: [
          {
            name: 'new_aviso',
            columns: [
              {name: 'id', type: 'integer primary key'},
              {name: 'descripcion', type: 'text'},
              {name: 'comentarios', type: 'text'},
              {name: 'cliente', type: 'text'},
              {name: 'tipos_avisos', type: 'text'},
              {name: 'estado', type: 'text'},
              {name: 'empleado_destino', type: 'text'},
              {name: 'empleado_responsable', type: 'text'},
              {name: 'fecha_prevista', type: 'text'},
              {name: 'hora_prevista', type: 'text'},
              {name: 'fecha_creacion', type: 'text'},
            ]
          }
        ]
      };

      //$rootScope.db = $cordovaSQLite.openDB(dbOptions.name);
      angular.forEach(dbOptions.tables, function(table) {
        var columns = [];

        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });
        var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        //self.query(query);
        //alert('Table ' + table.name + ' initialized');
      });
      //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS joke(id integer primary key, joke text)");
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
  .state('sat.nuevo_aviso', {
    url: '^/nuevo_aviso',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/nuevo_aviso.html',
        controller: 'NuevoAvisoCtrl'
      }
    }
  })
  .state('sat.home', {
    url: '^/home',
    cache:false,
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
        controller: 'AvisoCtrl'
      }
    }
  })
  .state('sat.aviso_relacionado', {
    url: '^/aviso/relacionado',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/avisos/aviso/aviso_relacionado.html',
        controller: 'AvisoRelacionadoCtrl'
      }
    }
  })
    .state('sat.alta_partes', {
      url: '^/aviso/partes',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/avisos/aviso/aviso_partes.html',
          controller: 'AvisoPartesCtrl'
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

