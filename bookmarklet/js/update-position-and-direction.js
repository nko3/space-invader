'use strict';

module.exports = function updatePositionAndDirection(obj, dude) {
  var x = dude.pos.x - dude.origin.x;

  // y is positive to the north for sound, positive to the south for dude.
  var y = dude.origin.y - dude.pos.y;

  // Convert to meters (very roughly).
  x /= 50;
  y /= 50;

  var direction = dude.state === "idle" ? "s" : dude.state;

  obj.setPosition(x, y);
  obj.setDirection(direction);
  // TODO velocity!
};
