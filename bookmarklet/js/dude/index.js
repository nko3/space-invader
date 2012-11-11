'use strict';
var headpane      =  require('./headpane');
var dudeOverrides =  require('./overrides');
var car           =  require('./car');

setTimeout(function () {

  dudeOverrides.init(nko);

  headpane.init(nko.me);
  car.init(nko.me);
  registerBuyCar();


}, 200);

function registerBuyCar() {
  headpane.unregister('sell your car');
  headpane.register('buy a car', function (event) {
    registerSellCar();
    dudeOverrides.setGotoSpeed(1000);
    car.show();
  });
}

function registerSellCar() {
  headpane.unregister('buy a car');
  headpane.register('sell your car', function (event) {
    registerBuyCar();
    dudeOverrides.setGotoSpeed(200);
    car.hide();
  });
}

