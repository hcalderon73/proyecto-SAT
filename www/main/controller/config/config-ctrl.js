'use strict';
angular.module('main').controller('ConfigCtrl', function ($location, $auth, $rootScope, $testService, $state, $http, $cordovaDialogs, $ionicHistory) {
  var model = this;
  
  model.errorValidation = {};

  if (model.refrescarStock === undefined) {
    model.refrescarStock = true;
  } else {
    model.refrescarStock = localStorage.refrescarStock;
  }

  if (model.horasDesglosadas === undefined) {
    model.horasDesglosadas = true;
  } else {
    model.horasDesglosadas = localStorage.horasDesglosadas;
  }
  
  if (model.url === '') {
    model.url = '';
  } else {
    model.url = localStorage.url;
  }
  if (model.lapsoSinc === '') {
    model.lapsoSinc = '';
  } else {
    model.lapsoSinc = parseInt(localStorage.lapsoSinc);
  }
  if (model.email === '') {
    model.email = '';
  } else {
    model.email = localStorage.email;
  }
  
  model.guardar = function () {
  
    
    /*VALIDACION*/
    if (!model.url) {
      $state.go('sat.config');
    }
    
    if (!model.email) {
      $state.go('sat.config');
    }
    
    if (!model.password) {
      $state.go('sat.config');
    }
    
    if (!model.lapsoSinc) {
      $state.go('sat.config');
    }

    localStorage.url = model.url;
    localStorage.lapsoSinc = model.lapsoSinc;
    localStorage.email = model.email;
    localStorage.horasDesglosadas = model.horasDesglosadas;
    localStorage.refrescarStock = model.refrescarStock;

    if (!$auth.isAuthenticated()) {
      
      /*DATOS DE USUARIO*/
      var user = {
        email: model.email,
        password: model.password
      };

      /*OPCIONES DE AUTENTIFICACION*/
      var opts = {
        url: localStorage.url + '/api/login',
        data: user,
        method: 'POST',
        withCredentials: false
      };

      /*RQUEST AUTENTIFICACION*/
      return $http(opts).then(function (data) {
        $testService.loginInfo();
        $testService.iniciarLapso();
        $auth.setToken(data.data.token);
        $state.go('sat.descarga');
        console.log("COOL");
        
      }), function (err) {       
        model.error.validacion = err.data !== null ? err.data : 'Revise el campo URL';
        console.log("peee");
        $state.go('sat.config');
      };
    } else {
      $testService.iniciarLapso();
      $ionicHistory.nextViewOptions({
         historyRoot: true,
         disableAnimate: true,
         expire: 300
        });
      $state.go('sat.descarga');
    }
  };
});
