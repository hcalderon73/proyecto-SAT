angular.module('main').service('$testService', function ($rootScope, $http, $interval, $q, $cordovaFile, $avisosService) {

  var lapso_interval = null;
  
  this.loginInfo = function () {
    $http.get(localStorage.url + '/api/login/info').success(function (data) {
      $rootScope.empleado = data.empleado;
      localStorage.empleado = data.empleado;
      $rootScope.empleadoAviso = data.empleadoAviso;
      localStorage.empleadoAviso = data.empleadoAviso;
      $rootScope.estadoAviso = data.estadoAviso;
      localStorage.estadoAviso = data.estadoAviso;
      $rootScope.empleadoDefecto = data.empleadoDefecto;
      localStorage.empleadoDefecto = data.empleadoDefecto;
      $rootScope.enviarEmail = data.enviarEmail;
      localStorage.enviarEmail = data.enviarEmail;
      $rootScope.formularios = data.formularios;
      localStorage.formularios = JSON.stringify(data.formularios);
      $rootScope.mostrarRecordatorioHerramientas = data.mostrarRecordatorioHerramientas;
      localStorage.mostrarRecordatorioHerramientas = data.mostrarRecordatorioHerramientas;
      $rootScope.recordatorioHerramientas = data.recordatorioHerramientas;
      localStorage.recordatorioHerramientas = data.recordatorioHerramientas;
      $rootScope.empleadoCtrl = data.empleadoCtrl;
      localStorage.empleadoCtrl = data.empleadoCtrl;
      $rootScope.estadoReparto = data.estadoReparto;
      localStorage.estadoReparto = data.estadoReparto;
      $rootScope.jefeObra = data.jefeObra;
      localStorage.jefeObra = data.jefeObra;
      $rootScope.starting = false;
    }).error(function () {
      alert('FALLO /api/login/info');
      if (localStorage.empleado) {
        $rootScope.empleado = Number(localStorage.empleado);
      }
      if (localStorage.empleadoAviso) {
        $rootScope.empleadoAviso = Number(localStorage.empleadoAviso);
      }
      if (localStorage.estadoAviso) {
        $rootScope.estadoAviso = Number(localStorage.estadoAviso);
      }
      if (localStorage.empleadoDefecto) {
        $rootScope.empleadoDefecto = localStorage.empleadoDefecto;
      }
      if (localStorage.enviarEmail) {
        $rootScope.enviarEmail = localStorage.enviarEmail;
      }
      if (localStorage.formularios) {
        $rootScope.formularios = JSON.parse(localStorage.formularios);
      }
      if (localStorage.mostrarRecordatorioHerramientas) {
        $rootScope.mostrarRecordatorioHerramientas = localStorage.mostrarRecordatorioHerramientas;
      }
      if (localStorage.recordatorioHerramientas) {
        $rootScope.recordatorioHerramientas = localStorage.recordatorioHerramientas;
      }
      if (localStorage.empleadoCtrl) {
        $rootScope.empleadoCtrl = localStorage.empleadoCtrl;
      }
      if (localStorage.estadoReparto) {
        $rootScope.estadoReparto = localStorage.estadoReparto;
      }
      if (localStorage.jefeObra) {
        $rootScope.jefeObra = localStorage.jefeObra;
      }
      $rootScope.starting = false;
    });
  };

  this.iniciarLapso = function () {
    var lapso = 600000;
    // cada 10 minutos por defecto
    if (lapso_interval) {
      $interval.cancel(lapso_interval);
    }

    if (localStorage.lapsoSinc && localStorage.lapsoSinc > 0) {
      lapso = localStorage.lapsoSinc * 60000;
      lapso_interval = $interval(tictac, lapso);
    }

    function tictac () {
      subirAvisos();
      descargarEnStorage('avisos', true);
      // actualizamos los avisos automáticamente cada lapso u hora
      if (localStorage.parte) {// sincronizamos partes creados offline y guardados en local
        var partes = JSON.parse(localStorage.parte);
        alert(partes);
        localStorage.removeItem('parte');
        for ( var i = 0; i < partes.length; i++) {
          subirDocumento('parte', partes[i], '/api/partes');
        }
      }
    }
  };

  this.subirAvisos = function () {
    var avisosAll = JSON.parse(localStorage.avisos);
    var avisos = angular.filter(avisosAll, {
      'TipoIntervencion': 'P'
    });
    $http.post(localStorage.url + '/api/avisos/subir', avisos);
  };

  this.descargarEnStorage = function (fichero, seleccionar) {
    $http.get(localStorage.url + '/api/' + fichero).success(function (data) {
      $rootScope.avisos = true;
      guardarDocumento(fichero, data, true);
      if (fichero === 'avisos') {
        localStorage.totalAvisos = data ? data.length : 0;
      }
      if (seleccionar && $rootScope.avisoSel) {
        $avisosService.seleccionarAviso($rootScope.avisoSel.Delegacion, $rootScope.avisoSel.Codigo);
      }
    }).error(function (data) {
      $rootScope.errorDescarga = 'Algunos datos no se han descargado correctamente.' + '\nRealice una descarga manual.';
      localStorage.totalAvisos = 0;
      if (!localStorage.getItem(fichero)) {
        data = [];
        guardarDocumento(fichero, data, true);
      }
      $rootScope.avisos = true;
    });
  };

  this.guardarDocumento = function (nombre, datos, reemplazar) {
    var aux = '';
    if (localStorage.getItem(nombre) === null || reemplazar) {
      localStorage.setItem(nombre, JSON.stringify(datos));
    } else {
      aux = JSON.parse(localStorage.getItem(nombre));
      angular.extend(true, aux, datos);
      localStorage.setItem(nombre, JSON.stringify(datos));
    }
  };

  this.subirDocumento = function (nombre, datos, url) {
    var elementos = [],
      aux;
      
    $http.post(localStorage.url + url, datos)
    .then(function () {
      descargarEnStorage('avisos',true);
      if ((localStorage.refrescarStock === true)) {
        downloadData({
          titulo: 'Artículos',
          nombre: 'articulos',
          url: '',
          localStorage: false,
          finish: false,
          success: false
        });
      }
    },function (error) {
      datos.error = error.data;
      if (!localStorage.getItem(nombre)) {
        elementos.push(datos);
        localStorage.setItem(nombre,JSON.stringify(elementos));
      }
      else {
        aux = JSON.parse(localStorage.getItem(nombre));

        for (var i = 0; i < aux.length; i++) {
          elementos.push(aux[i]);
        }
        elementos.push(datos);
        localStorage.setItem(nombre,JSON.stringify(elementos));
      }
    });
  };

  this.downloadData = function (item) {
 
    var urlFocus = localStorage.url + '/api/' + item.nombre;
    
    if (item.url) {
      urlFocus = localStorage.url + item.url;
    }
    return $http.get(urlFocus).then(function (result) {
    
      if (item.nombre === 'avisos') {
        localStorage.avisos =  angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'empleados') {
        localStorage.empleados = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'calendarios') {
        localStorage.calendarios = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'articulos') {
        localStorage.articulos = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'gastos') {
        localStorage.gastos = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'tiposAviso') {
        localStorage.tiposAviso = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'estados') {
        localStorage.estados = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'flujo') {
        localStorage.flujo = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'clientes') {
        localStorage.clientes = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
      if (item.nombre === 'tiposHora') {
        localStorage.tiposHora = angular.toJson(result.data);
        return saveThis(item, result.data);
      }
    });
  };


  function saveThis (item, data) {
    var deferred = $q.defer();
    if (item.localStorage) {
      $rootScope.avisos = true;
      model.guardarDocumento(item.nombre, data, true);
      if (item.nombre == "avisos") {
        localStorage.totalAvisos = data ? data.length : 0;
      }
      if (/*seleccionar && */
      $rootScope.avisoSel) {
        $aviso.seleccionarAviso($rootScope.avisoSel.Delegacion, $rootScope.avisoSel.Codigo);
      }
      deferred.resolve();
    } else {
      var filename = item.nombre + '.json';
      var rutaFile = cordova.file.externalDataDirectory;
      $cordovaFile.writeFile(rutaFile, filename, angular.toJson(data), true).then(function (success) {
        deferred.resolve();
      }, function (error) {
        deferred.reject();
      });
    }
    return deferred.promise;
  }

   
  function saveData (item, data) {
    var filename = item.nombre + '.json';
    var deferred = $q.defer();
    if (item.localStorage) {
      $rootScope.avisos = true;
      guardarDocumento(item.nombre, data, true);
      if (item.nombre === 'avisos') {
        localStorage.totalAvisos = data ? data.length : 0;
      }

      if (/*seleccionar && */
      $rootScope.avisoSel) {
        $avisosService.seleccionarAviso($rootScope.avisoSel.Delegacion, $rootScope.avisoSel.Codigo);
      }
      deferred.resolve();
    } else {
      //writeFile(path, file, data, replace)
      var rutaFile = cordova.file.externalDataDirectory;
      $cordovaFile.writeFile(rutaFile, filename, angular.toJson(data), true);
    }
    return deferred.promise;
  }

  this.ping = function () {
    return $http.get(localStorage.url + '/api/ping').then(function (result) {
      return result;
    });
  };

  this.dirCheck = function () {
    var ok = true;
    $cordovaFile.checkDir(cordova.file.externalDataDirectory, null, function () {//Fail
      $cordovaFile.createDir(cordova.file.externalDataDirectory, null, function () {
        ok = false;
      });
    });
    return ok;
  };
});

