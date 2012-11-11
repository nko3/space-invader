'use strict';

module.exports = function updateListener(listener, me) {
  var x = me.pos.x - me.origin.x;

  // y is positive to the north for sound, positive to the south for me.
  var y = me.origin.y - me.pos.y;

  // Convert to meters (very roughly).
  x /= 50;
  y /= 50;

  var direction = me.state === "idle" ? "s" : me.state;

  listener.setPosition(x, y);
  listener.setDirection(direction);
  // TODO velocity!
};
