'use strict';

exports.mixinDirectional = function (target) {
  target.setPosition = function (x, y) {
    this._rawNode.setPosition(x, y, 0);
  };

  target.setOrientation = function (angle) {
    var frontVector = angleToVector(angle);
    setOrientation(this._rawNode, frontVector);
  };

  target.setDirection = function (direction) {
    var frontVector = directionToVector(direction);
    setOrientation(this._rawNode, frontVector);
  };

  target.setVelocity = function (x, y) {
    this._rawNode.setVelocity(x, y, 0);
  };
};

function setOrientation(rawNode, frontVector) {
  var upVector = [0, 0, 1];
  rawNode.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
}

function directionToVector(dir) {
  switch (dir) {
    case "n":
      return [0, 1, 0];
    case "s":
      return [0, -1, 0];
    case "w":
      return [-1, 0, 0];
    case "e":
      return [1, 0, 0];
  }
}

function angleToVector(angle) {
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
}
