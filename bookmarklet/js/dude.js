'use strict';
var headpane = require('./headpane');
var dudeOverrides = require('./dude-overrides');
var car = require('./car');

headpane.register('buy a car', function (event) {
  dudeOverrides.setGotoSpeed(1000);
  car.toggleCar();
});
