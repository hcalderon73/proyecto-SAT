'use strict';
angular.module('main').controller('NuevoAvisoCtrl', function ($scope, ionicDatePicker, $ionicModal) {

  $scope.datos = [];

  var clientes = angular.fromJson(localStorage.clientes);
  var tiposAviso = angular.fromJson(localStorage.tiposAviso);
  var estados = angular.fromJson(localStorage.estados);
  var empleadoDestino = angular.fromJson(localStorage.empleados);
  var empleadoResponsable = angular.fromJson(localStorage.empleados);
  var selecciones = [];


  /*MODAL DINAMICO*/
  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.OpcionesCliente = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(clientes, function (value) {
      return list.push({id: value.cliente, name: value.razonSocial})
    });

    $scope.tipo = "clientes";
    $scope.title = "Cliente";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesTiposAviso = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    var tipoAvisos = tiposAviso;
    angular.forEach(tipoAvisos, function (value) {
      return list.push({id: value.Indice, name: value.Descripcion})
    });

    $scope.tipo = "tiposAviso";
    $scope.title = "Tipo de Aviso";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesEstados = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(estados, function (value) {
      return list.push({id: value.EstadoAviso, name: value.Descripcion})
    });

    $scope.tipo = "estados";
    $scope.title = "Estado";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesEmpleadoDestino = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(empleadoDestino, function (value) {
      return list.push({id: value.Empleado, name: value.Nombre})
    });

    $scope.tipo = "empleadoDestino";
    $scope.title = "Empleado Destino";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesEmpleadoResponsable = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(empleadoResponsable, function (value) {
      return list.push({id: value.Empleado, name: value.Nombre})
    });

    $scope.tipo = "empleadoResponsable";
    $scope.title = "Empleado Responable";
    $scope.data = list;
    $scope.modal.show();
  };


  $scope.OpcionesDireccion = function () {
    var list = [];

    console.log($scope.listaDirecciones);
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach($scope.listaDirecciones, function (value) {
      return list.push({id: value.direccion, name: value.nombre})
    });

    $scope.tipo = "direcciones";
    $scope.title = "Direccion";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.select = function(itemId, tipo) {
    switch (tipo) {
      case "clientes":
        var clientesS = $scope.filterCliente(itemId);
        break;
      case "tiposAviso":
        $scope.filterTiposAviso(itemId);
        break;
      case "estados":
        $scope.filterEstados(itemId);
        break;
      case "empleadoDestino":
        $scope.filterEmpleadoDestino(itemId);
        break;
      case "empleadoResponsable":
        $scope.filterEmpleadoResponsable(itemId);
        break;
      case "direcciones":
        $scope.filterDirecciones(itemId);
        break;
    };
    $scope.closeModal();
  };

  $scope.filterCliente = function (itemId) {
    $scope.clienteSelecionado = [];
    $scope.direccionSeleccionada = null;
    $scope.clienteSelecionado =  _.filter(clientes, function (element) {
      return element.cliente == itemId;
    });

    selecciones.cliente = $scope.clienteSelecionado;

    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.cliente);
    angular.forEach($scope.clienteSelecionado, function (value) {
      if (value.direcciones.length > 0){
        $scope.listaDirecciones = value.direcciones;
      };
    })
  };

  $scope.filterTiposAviso = function(itemId) {
    $scope.tipoAvisoSeleccionado = [];
    $scope.tipoAvisoSeleccionado = _.filter(tiposAviso, function (element) {
      return element.Indice == itemId;
    });

    selecciones.tiposAviso = $scope.tipoAvisoSeleccionado;
    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.tiposAviso);
  };

  $scope.filterEstados = function (itemId) {
    $scope.estadoSeleccionado = [];
    $scope.estadoSeleccionado = _.filter(estados, function (element) {
      return element.EstadoAviso == itemId;
    });
    selecciones.estados = $scope.estadoSeleccionado;
    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.estados);
  };

  $scope.filterEmpleadoDestino = function (itemId) {
    $scope.empleadoDestinoSeleccionado = [];
    $scope.empleadoDestinoSeleccionado = _.filter(empleadoDestino, function (element) {
      return element.Empleado == itemId;
    });

    selecciones.empleadoDestino = $scope.empleadoDestinoSeleccionado;
    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.empleadoDestino);
  };

  $scope.filterEmpleadoResponsable = function (itemId) {
    $scope.empleadoResponsableSeleccionado = [];
    $scope.empleadoResponsableSeleccionado = _.filter(empleadoResponsable, function (element) {
      return element.Empleado == itemId;
    });

    selecciones.empleadoResponsable = $scope.empleadoResponsableSeleccionado;
    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.empleadoResponsable);
  };

  $scope.filterDirecciones = function (itemId) {
    $scope.direcciondireccionSeleccionada = [];
    $scope.direccionSeleccionada = _.filter($scope.listaDirecciones, function (element) {
      return element.direccion == itemId;
    });
    selecciones.direccion = $scope.direccionSeleccionada;
    localStorage.datosFormNuevoAviso = angular.toJson(selecciones.direccion);
  };


  var ipObj1 = {
    callback: function (val) {  //Mandatory
      //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.fechaPrevista = new Date(val);
      selecciones.fechaPrevista = $scope.fechaPrevista;
      localStorage.datosFormNuevoAviso = angular.toJson(selecciones.fechaPrevista);
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };



  $scope.timePickerObject = {
    step: 15,  //Optional
    format: 12,  //Optional
    titleLabel: '12-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      timePickerCallback(val);
    }
  };




  function timePickerCallback(val) {

    console.log(val);
    if($scope.horaPrevista != undefined){
      $scope.timePickerObject.inputEpochTime = $scope.horaPrevista;
    }

    if (typeof (val) === 'undefined') {
      //console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      $scope.horaPrevista = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes();
      selecciones.horaPrevista = $scope.horaPrevista;
      localStorage.datosFormNuevoAviso = angular.toJson(selecciones.horaPrevista);
    }
  }




});
