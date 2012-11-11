'use strict';
var headpane      =  require('./headpane');
var dudeOverrides =  require('./overrides');
var car           =  require('./car');
var broadcast     =  require('./broadcast');
var socket = require('../socket');
var me;
var dudes;

setTimeout(function () {

  me = nko.me;
  dudes = nko.dudes;
  dudeOverrides.init(nko);

  headpane.init(me);
  registerBuyCar();

}, 200);

function registerBuyCar() {
  headpane.unregister('Sell your car');
  headpane.register('Buy a car', function (event) {
    registerSellCar();
    nko.me.hasCar = true;
    nko.me.updateCar();
  });
}

function registerSellCar() {
  headpane.unregister('Buy a car');
  headpane.register('Sell your car', function (event) {
    registerBuyCar();
    nko.me.hasCar = false;
    nko.me.updateCar();
  });
}

socket.on('exec', function (data) {
  var id = data.opts.id;
  var dude = dudes[id];
  if (!dude) return;

  dude[data.method]();
});

