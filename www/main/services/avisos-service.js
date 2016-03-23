'use strict';
angular.module('main').service('$avisosService', function ($rootScope, $location, $state) {
  var model = this;
  var validacion = '';
  // iniciamos con posible valor guardado
  if (localStorage.avisoSel /*&& localStorage.descSel*/) {
    try {
      $rootScope.avisoSel = JSON.parse(localStorage.avisoSel);
    } catch (err) {
      console.log(String(localStorage.avisoSel));
    }
  }

  model.seleccionarAviso = function (delegSelec, avisoSelec) {

    var found = false;
    validacion = JSON.parse(localStorage.avisos);

    angular.forEach(validacion, function (value) {

      if (!found) {
        if (delegSelec === value.Delegacion && avisoSelec === value.Codigo) {
          model.seleccionado = value;
          $rootScope.avisoSel = value;
          localStorage.avisoSel = JSON.stringify(value);
          found = true;
        }
      }
    });

    if (!found) {
      model.seleccionado = null;
      $rootScope.avisoSel = null;
      localStorage.avisoSel = null;
    }

    if ($location.url() === '/') {
      $state.reload();
    }

    model.online = function (param) {
      $rootScope.online = param;
    };
  };
});

