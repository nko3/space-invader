'use strict';
var headpane      =  require('./headpane');
var dudeOverrides =  require('./overrides');
var car           =  require('./car');
var broadcast     =  require('./broadcast');
var socket = require('../socket');
var me;

setTimeout(function () {

  me = nko.me;
  dudeOverrides.init(nko);

  headpane.init(me);
  car.init(me);
  registerBuyCar();

}, 200);

function registerBuyCar() {
  headpane.unregister('Sell your car');
  headpane.register('Buy a car', function (event) {
    registerSellCar();
    me.showCar();
    broadcast.exec('showCar', me.id);
  });
}

function registerSellCar() {
  headpane.unregister('Buy a car');
  headpane.register('Sell your car', function (event) {
    registerBuyCar();
    me.hideCar();
    broadcast.exec('hideCar', me.id);
  });
}

socket.on('exec', function (data) {
  console.log('executing', data.method);
});

