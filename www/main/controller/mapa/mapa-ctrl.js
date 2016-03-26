angular.module('main')
.controller('MapaCtrl', function ($rootScope, $cordovaGeolocation) {
    var model = this;
    var avisos = JSON.parse(localStorage.avisos);
    avisos = _.filter(avisos, {Empleado: $rootScope.empleado}); //$rootScope.empleado
    var empleados = JSON.parse(localStorage.empleados);
    empleado = _.filter(empleados, {Empleado: $rootScope.empleado}); //$rootScope.empleado
    model.markers = [];

    /*UBICACION*/
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {

        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        model.map = { center: { latitude: lat, longitude: long }, zoom: 8 };

        model.marker = {
          id: 0,
          coords: {
            latitude: lat,
            longitude: long
          },
          options: {
            clickable: true,
            labelContent: empleado.Nombre,
            icon: "content/img/marker_here.png",
            labelClass: "marker-label"
          },
          events: {
            click: function(marker, eventName, args) {
              alert(angular.fromJson(empleado.Nombres));
            }
          }
        };

        model.getMarkers();

      }, function(err) {
        // error
      });


    var id = 1;
    var icon = "";


    model.getMarkers = function () {

      console.log('getMarkers');

      angular.forEach(avisos, function (aviso) {

        id++;
        if(aviso.TipoIntervencion === "C") {
          icon = "content/img/marker_correctivo.png";
        } else {
          icon = "content/img/marker_preventivo.png";
        }

       model.markers.push({
          id: id,
          coords: {
            latitude: aviso.Latitud,
            longitude: aviso.Longitud
          },
          events: {
            click: function(marker, eventName, args) {
              console.log(marker.labelContent);
            }
          },
          options: {
            clickable: true,
            labelContent: aviso.Descripcion,
            icon: icon,
            labelClass: "marker-label"
          }
        });

      });

      console.log(model.markers);
    };






});