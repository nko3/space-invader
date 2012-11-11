'use strict';

var transformCar = require('./dude/car').transformCar;

var PIXELS_PER_METER = 200;

exports.updatePositionAndDirections = function (sounds, dude) {
  if (!dude) return;
  if (sounds.tts) {
    exports.updatePositionAndDirection(sounds.tts, dude);
  }

  if (sounds.panning) {
    exports.updatePositionAndDirection(sounds.panning, dude);
  }
};

exports.updatePositionAndDirection = function (obj, dude) {
  if (!dude) return;
  // Convert to meters (very roughly).
  var x = (dude.pos.x - dude.origin.x) / PIXELS_PER_METER;
  var y = (dude.origin.y - dude.pos.y) / PIXELS_PER_METER;

  var velX = dude.vel ? dude.vel.x / PIXELS_PER_METER : 0;
  var velY = dude.vel ? dude.vel.y / PIXELS_PER_METER : 0;

  var direction = dude.state === 'idle' ? 's' : dude.state;

  obj.setPosition(x, y);
  obj.setDirection(direction);
  obj.setVelocity(velX, velY);

  if (dude.car) {
    transformCar(dude.car, direction);
  }
};
