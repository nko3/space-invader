'use strict';

var angleToVector = require('./helpers').angleToVector;

function PannerNode(context) {
  this.position = null;
  this.angle = null;

  this._rawNode = context.createPanner();
}

PannerNode.prototype.setPosition = function (pos) {
  this.position = pos;
  this._rawNode.setPosition(pos[0], pos[1], pos[2]);
};

PannerNode.prototype.setOrientation = function (angle) {
  // TODO deduplicate code here and in listener.js.
  this.angle = angle;

  var frontVector = angleToVector(angle);
  var upVector = [0, 0, 1];
  this.context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};

module.exports = PannerNode;
