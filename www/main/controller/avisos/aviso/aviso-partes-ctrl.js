'use strict';
angular.module('main').controller('AvisoPartesCtrl', function ($scope, ionicDatePicker, $ionicModal, $rootScope, $cordovaBarcodeScanner) {

  $scope.lineasPartes = [];
  $scope.statusObservaciones = true;
  $scope.statusManoObra = false;
  $scope.statusGasto = false;
  $scope.statusMaterial = false;
  $scope.select = select;


  /*Observaciones*/
  $scope.observaciones = {
    observacion: '',
    referencia: '',
    fecha: '',
    tipoParte: ''
  };

  /*Empleado*/
  $scope.manoObra = {
    empleado:'',
    imputar:false,
    concepto:'',
    tipoHora:'',
    horas: ''
  };

  $scope.linea = {
    concepto: undefined,
    imputar: false
  };

  $scope.confirmarParte = function () {
    /*primera parte*/
    console.log($scope.observaciones);
    /*Segunda parte*/
    console.log($scope.manoObra);
    console.log($scope.lineasPartes);
    /*Tercera parte*/

    /*cuarta parte*/
  };

  $scope.barcode = function () {

    $cordovaBarcodeScanner
      .scan()
      .then(function (result) {
        alert("We got a barcode\n" +
        "Result: " + result.text + "\n" +
        "Format: " + result.format + "\n" +
        "Cancelled: " + result.cancelled);
      },
      function (error) {
        alert("Scanning failed: " + error);
      });


    // NOTE: encoding not functioning yet
    $cordovaBarcodeScanner
      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
      .then(function(success) {
        alert(success);
      }, function(error) {
        // An error occurred
      });
  };


  var empleados = angular.fromJson(localStorage.empleados);
  var horas = angular.fromJson(localStorage.tiposHora);
  var gastos = angular.fromJson(localStorage.gastos);
  var articulos = angular.fromJson(localStorage.articulos);

  /*MODAL DINAMICO*/
  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  /*MODAL DINAMICO*/
  $ionicModal.fromTemplateUrl('articulos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(articulosModal) {
    $scope.articulosModal = articulosModal
  });

   function select(itemId, tipo) {

    switch (tipo) {
      case "empleado":
        if($rootScope.empleado === tipo ) {
          $scope.filterEmpleado($rootScope.empleado);
        } else {
          $scope.filterEmpleado(itemId);
        }
        break;
      case "hora":
        $scope.filterHoras(itemId);
        break;
      case "gasto":
        $scope.filterGasto(itemId);
        break;
      case "empleado_gasto":
        $scope.filterGastoEmpleado(itemId);
        break;
      case "articulos":
        $scope.filterArticulos(itemId);
        break;

    };
    $scope.closeModal();
     $scope.closeArticulosModal();
  };

  $scope.filterEmpleado = function (itemId) {

    $scope.empleadoSeleccionado = [];
    $scope.empleadoSeleccionado = _.filter(empleados, function (element) {
      return element.Empleado == itemId;
    });

    $scope.manoObra.empleado = $scope.empleadoSeleccionado;

  };

  $scope.filterHoras = function (itemId) {
//    $scope.horaPrevista = [];
    $scope.horaSeleccionado = _.filter(horas, function (element) {
     return element.codigo == itemId;
    });

    $scope.manoObra.tipoHora = $scope.horaSeleccionado;

  };

  $scope.filterGasto = function (itemId) {
//    $scope.horaSeleccionado = [];
    $scope.gastoSeleccionado = _.filter(gastos, function (element) {
      return element.Indice == itemId;
    });

  };

  $scope.filterGastoEmpleado = function (itemId) {
    $scope.gastoEmpleadoSeleccionado = [];
    $scope.gastoEmpleadoSeleccionado = _.filter(empleados, function (element) {
      return element.Empleado == itemId;
    });
  };


  $scope.filterArticulos = function (itemId) {
    $scope.articuloSeleccionado = [];
    $scope.articuloSeleccionado = _.filter(articulos, function (element) {
      return element.Codigo == itemId;
    });
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.closeArticulosModal = function () {
    $scope.articulosModal.hide();
  };

  $scope.addLinea = function () {
    if(!$scope.manoObra.empleado) {
      return alert("Debe informar un empleado");
    }

    if(!$scope.manoObra.concepto) {
      return alert("Debe informar un concepto");
    }

    if(!$scope.manoObra.tipoHora) {
      return alert("Debe informar un tipo de hora");
    }

    if(!$scope.manoObra.horas) {
      return alert("Debe informar una hora");
    }

    $scope.lineasPartes.push($scope.manoObra);
    console.log($scope.lineasPartes);
    $scope.manoObra = {};
    $scope.empleadoSeleccionado = '';
    $scope.horaSeleccionado = '';
    $scope.horaPrevista = '';
  };


  $scope.onObservaciones = function () {
    resetStatus();
    $scope.statusObservaciones = true;
  }

  $scope.onManoObra = function () {
    resetStatus();
    $scope.statusManoObra = true;
  }

  $scope.onGasto = function () {
    resetStatus();
    $scope.statusGasto = true;
  }

  $scope.onMaterial = function () {
    resetStatus();
    $scope.statusMaterial = true;
  }

  function resetStatus() {
    $scope.statusObservaciones = false;
    $scope.statusManoObra = false;
    $scope.statusGasto = false;
    $scope.statusMaterial = false;
  };


  $scope.OpcionesEmpleado = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(empleados, function (value) {
      return list.push({id: value.Empleado, name: value.Nombre})
    });

    $scope.tipo = "empleado";
    $scope.title = "Empleado";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesHora = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(horas, function (value) {
      return list.push({id: value.codigo, name: value.descripcion})
    });

    $scope.tipo = "hora";
    $scope.title = "Tipos de Hora";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesGasto = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(gastos, function (value) {
      return list.push({id: value.Indice, name: value.Descripcion})
    });

    $scope.tipo = "gasto";
    $scope.title = "Tipos de Gasto";
    $scope.data = list;
    $scope.modal.show();
  };

  $scope.OpcionesEmpleadoGasto = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(empleados, function (value) {
      return list.push({id: value.Empleado, name: value.Nombre})
    });

    $scope.tipo = "empleado_gasto";
    $scope.title = "Empleado";
    $scope.data = list;
    $scope.modal.show();
  };


  $scope.OpcionesArticulo = function () {
    var list = [];
    /*Generamos array para el selector*/
    /*USANDO LAS CONSTANTES ID, NAME*/
    angular.forEach(articulos, function (value) {
      return list.push({id: value.Codigo, name: value.Descripcion})
    });

    $scope.tipo = "articulos";
    $scope.title = "Articulos";
    $scope.dataAvisos = list;
    $scope.articulosModal.show();
  };






  var fechaObservaciones = {
    callback: function (val) {  //Mandatory
      //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.fechaPrevista = new Date(val);
      $scope.observaciones.fecha = $scope.fechaPrevista;
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

  $scope.fechaObservaciones = function(){
    ionicDatePicker.openDatePicker(fechaObservaciones);
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

    if($scope.horaPrevista != undefined){
      $scope.timePickerObject.inputEpochTime = $scope.horaPrevista;
    }

    if (typeof (val) === 'undefined') {
      //console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      $scope.horaPrevista = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes();
      $scope.manoObra.horas = $scope.horaPrevista;
    }
  };



});
