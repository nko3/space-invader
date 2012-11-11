'use strict';

var PIXELS_PER_METER = 50;

module.exports = function updatePositionAndDirection(obj, dude) {
  var x = dude.pos.x - dude.origin.x;

  // y is positive to the north for sound, positive to the south for dude.
  var y = dude.origin.y - dude.pos.y;

  // Convert to meters (very roughly).
  x /= PIXELS_PER_METER;
  y /= PIXELS_PER_METER;

  var direction = dude.state === "idle" ? "s" : dude.state;

  obj.setPosition(x, y);
  obj.setDirection(direction);
  // TODO velocity!
};
