"use strict";

var ctrlKeyIsDown = false;
$(window).on({
  'keydown': function (e) {
    ctrlKeyIsDown = e.ctrlKey;
  },
  'keyup': function (e) {
    ctrlKeyIsDown = e.ctrlKey;
  }
});

module.exports = function () {
    return ctrlKeyIsDown;
};
