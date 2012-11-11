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


var haveCarIv;
function registerBuyCar() {
  headpane.unregister('Sell your car');
  headpane.register('Buy a car', function (event) {
    clearInterval(haveCarIv);
    registerSellCar();
    nko.me.updateCar({ hasCar: true });
    broadcast.exec('updateCar', { id: nko.me.id, hasCar: true });
    // HACK: keep telling everyone about our car periodically since syncing on new join is not working
    haveCarIv = setInterval(
      function () {
        broadcast.exec('updateCar', { id: nko.me.id, hasCar: true });
      }, 3000);
  });
}

function registerSellCar() {
  headpane.unregister('Buy a car');
  headpane.register('Sell your car', function (event) {
    clearInterval(haveCarIv);
    registerBuyCar();
    nko.me.updateCar({ hasCar: false });
    broadcast.exec('updateCar', { id: nko.me.id, hasCar: false });
  });
}

socket.on('exec', function (data) {
  var id = data.opts.id;
  var dude = dudes[id];
  if (!dude) { return; }

  dude[data.method](data.opts);
});

