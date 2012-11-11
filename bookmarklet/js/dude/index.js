'use strict';
var headpane      =  require('./headpane');
var dudeOverrides =  require('./overrides');
var car           =  require('./car');

setTimeout(function () {

  dudeOverrides.init(nko);

  headpane.init(nko.me);
  car.init(nko.me);

}, 200);

headpane.register('buy a car', function (event) {
  dudeOverrides.setGotoSpeed(1000);
  car.toggleCar();
});
