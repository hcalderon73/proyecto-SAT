'use strict';
angular.module('main').controller('GestionDocumentalCtrl', function ($scope, $cordovaCamera) {

  $scope.tomarFoto = function () {

    var options = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
    };

    $cordovaCamera.getPicture(options).then(function(imageURI) {

      var image = document.getElementById('myImage');
      image.src = imageURI;

    }, function(err) {
      // error
    });

  };


});
