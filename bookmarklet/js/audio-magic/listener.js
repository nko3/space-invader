'use strict';

var angleToVector = require('./helpers').angleToVector;

function Listener(context) {
  this._context = context;

  this.position = null;
  this.angle = null;
}

Listener.prototype.setPosition = function (x, y) {
  this.position = pos;

  this._context.listener.setPosition(x, y, 0);
};

Listener.prototype.setOrientation = function (angle) {
  this.angle = angle;

  var frontVector = angleToVector(angle);
  var upVector = [0, 0, 1];
  this._context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};
