"use strict";

var angleToVector = require("./helpers").angleToVector;

function Listener(context, options) {
  this.context = context;
  this.position = options.position;
  this.angle = options.angle;

  this.setPosition(this.position);
  this.setOrientation(this.angle);
}

Listener.prototype.setPosition = function (pos) {
  this.position = pos;
  this.context.listener.setPosition(pos[0], pos[1], pos[2]);
};

Listener.prototype.setOrientation = function (angle) {
  this.angle = angle;

  var frontVector = angleToVector(angle);
  var upVector = [0, 0, 1];
  this.context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};
