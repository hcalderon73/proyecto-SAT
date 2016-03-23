'use strict';
angular.module('main').filter('colorEstado', function () {
  return function (id) {
    var color = '';
    switch (id) {
      case 2:
        color = 'orange';
        break;
      case 3:
        color = 'blue';
        break;
      case 60:
        color = 'red';
        break;
      case 61:
        color = 'brown';
        break;
      case 70:
        color = 'yellow';
        break;
      case 80:
        color = 'green';
        break;
      default: color = '#eee';
    }

    return color;
  };
});
