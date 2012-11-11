'use strict';

var keyIsDown = false;
$(window).on({
  'keydown': function (e) {
    keyIsDown = e.ctrlKey || e.shiftKey;
  },
  'keyup': function (e) {
    keyIsDown = e.ctrlKey || e.shiftKey;
  }
});

module.exports = function () {
  return keyIsDown;
};
