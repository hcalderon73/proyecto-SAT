'use strict';
angular.module('main').controller('DescargaCtrl', function ($testService, $auth, $stateParams) {
  var model = this;
  
  model.auto = ($stateParams.auto === 'true');
  
  this.items = [
    {titulo: 'Avisos', nombre: 'avisos', url: '', finalizado: false, correcto: false, descargar: true},
    {titulo: 'Empleados', nombre: 'empleados', url: '/api/maestros/empleados', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Calendarios', nombre: 'calendarios', url: '', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Artículos', nombre: 'articulos', url: '', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Gastos', nombre: 'gastos', url: '', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Tipos de avisos', nombre: 'tiposAviso', url: '/api/avisos/tipos', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Estados de avisos', nombre: 'estados', url: '/api/avisos/estados', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Flujo de estados', nombre: 'flujo', url: '/api/avisos/flujo', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Clientes', nombre: 'clientes', url: '/api/maestros/clientes', finalizado: false, correcto: false, descargar: false},
    {titulo: 'Tipos de Hora', nombre: 'tiposHora', url: '/api/maestros/tiposHora', finalizado: false, correcto: false, descargar: false}
  ];
  
  model.avisos = localStorage.avisos;

  model.status = null;
  model.myPromises = [];

  //var maxItems = 8;
  var countIems = 0;
  var item_error = null;

  if (model.auto) {
    model.downloadAllData();
  }

  model.downloadAllData = function () {
    $testService.ping()
    .then(function (results) {
      angular.forEach(model.items, function (item) {
        model.downloadData(item);
      });
    },
    function () {
      model.status = {
        text: 'No está conectado a internet o la API no está disponible.',
        error: true
      };
    });
  };

  model.downloadData = function (item) {
    /*TIPO DE AVISO*/

    
    /*INICIAMOS LOS ESTATUS DE DESCARGA*/
    item.finalizado = false;
    item.correcto = false;

    /*CREAMOS UNA PROMESA*/
    var myPromise = $testService.downloadData(item)
    .then(function (data) {

    }, function (error) {
      /*SALIO MAL*/
      console.log(error);
      item_error = {
        text: JSON.stringify(error),
        error: true
      };
      return true;
    })
    .then(function (error) {
      if (!error) {
        item.finalizado = true;
        item.correcto = true;
      }
      else {
        item.finalizado = true;
      }
      model.checkEnd();
    }, function (error) {
      item_error = {
        text: JSON.stringify(error),
        error: true
      };
      item.finalizado = true;
      model.checkEnd();
    });
    
    model.myPromises.push(myPromise);
  };

  model.checkEnd = function () {
    countIems++;
    if (countIems >= model.items.length) {
      model.auto = false;
      if (!item_error) {
        model.status = {
          text: 'Descarga finalizada',
          error: false
        };
      } else {
        model.status = item_error;
      }
    }
  };

  model.downloadFile = function () {
    var url = encodeURI(localStorage.url + '/api/avisos/descargarFile');
    var targetPath = 'cordova.file.dataDirectory' + 'sat_data/' + 'myDocum.pdf';
    var trustHosts = true;
    var options = {};

    $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function () {
      console.log('down good');
    }, function () {
      console.log('down fail');
    }, true, {
      headers: {
        'Authorization': 'Bearer ' + $auth.getToken()
      }
    });
  };
});

