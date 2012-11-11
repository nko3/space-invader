'use strict';
var headpane = require('./headpane');
var dudeOverrides = require('./dude-overrides');
var car = require('./car');

headpane.register('buy a car', function (event) {
  alert('need money dude');
  dudeOverrides.setGotoSpeed(800);
  car.toggleCar();
});
