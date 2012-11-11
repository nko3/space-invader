'use strict';

var angleToVector = require('./helpers').angleToVector;
var directionToVector = require('./helpers').directionToVector;

function Listener(context) {
  this._context = context;
}

Listener.prototype.setPosition = function (x, y) {
  this._context.listener.setPosition(x, y, 0);
};

Listener.prototype.setOrientation = function (angle) {
  var frontVector = angleToVector(angle);
  var upVector = [0, 0, 1];
  this._context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};

Listener.prototype.setDirection = function (direction) {
  var frontVector = directionToVector(direction);
  var upVector = [0, 0, 1];
  this._context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};

Listener.prototype.setVelocity = function (x, y) {
  this._context.listener.setVelocity(x, y, 0);
};

module.exports = Listener;
