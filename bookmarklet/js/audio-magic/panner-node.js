'use strict';

var angleToVector = require('./helpers').angleToVector;

function PannerNode(context) {
  this._context = context;
  this._rawNode = this._context.createPanner();
}

PannerNode.prototype.setPosition = function (x, y) {
  this._rawNode.setPosition(x, y, 0);
};

PannerNode.prototype.setOrientation = function (angle) {
  // TODO deduplicate code here and in listener.js.
  var frontVector = angleToVector(angle);
  var upVector = [0, 0, 1];
  this._context.listener.setOrientation(
    frontVector[0], frontVector[1], frontVector[2],
    upVector[0], upVector[1], upVector[2]
  );
};

module.exports = PannerNode;
