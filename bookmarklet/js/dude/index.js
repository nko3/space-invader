'use strict';
var headpane      =  require('./headpane');
var dudeOverrides =  require('./overrides');
var car           =  require('./car');
var me;

setTimeout(function () {

  me = nko.me;
  dudeOverrides.init(nko);

  headpane.init(me);
  car.init(me);
  registerBuyCar();


}, 200);

function registerBuyCar() {
  headpane.unregister('sell your car');
  headpane.register('buy a car', function (event) {
    registerSellCar();
    me.speed = 1000;
    me.showCar();
  });
}

function registerSellCar() {
  headpane.unregister('buy a car');
  headpane.register('sell your car', function (event) {
    registerBuyCar();
    me.speed = 200;
    me.hideCar();
  });
}

