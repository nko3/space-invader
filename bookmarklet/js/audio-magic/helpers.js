"use strict";


exports.angleToVector = function (angle) {
  var vector = [0, 1, 0];
  var pi = Math.PI;

  if (angle === 0) {
    return vector;
  }

  if (angle > 0 && angle < pi / 2) {
    vector[0] = Math.tan(angle);
    vector[1] = 1;
  } else if (angle === pi / 2) {
    vector[0] = 1;
    vector[1] = 0;
  } else if (angle > pi / 2 && angle < pi) {
    vector[0] = 1;
    vector[1] = -1 * Math.tan(angle - pi / 2);
  } else if (angle === pi) {
    vector[1] = -1;
  } else if (angle > pi && angle < 1.5 * pi) {
    vector[0] = -1;
    vector[1] = -1 * Math.tan(1.5 * pi - angle);
  } else if (angle === 1.5 * pi) {
    vector[0] = -1;
    vector[1] = 0;
  } else if (angle > 1.5 * pi && angle < 2 * pi) {
    vector[0] = -1;
    vector[1] = Math.tan(angle - 1.5 * pi);
  }

  return vector;
};
