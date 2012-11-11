'use strict';

var PannerNode = require('./panner-node');
var SoundNode = require('./sound-node');

function PanningSound(context) {
  this._pannerNode = new PannerNode(context);
  this._pannerNode._rawNode.connect(context.destination);

  this._soundNode = new SoundNode(context);
}

PanningSound.prototype.playRawData = function (length, sampleRate, channel0) {
  this._soundNode.playRawData(length, sampleRate, channel0, this._pannerNode._rawNode);
};

PanningSound.prototype.playArrayBuffer = function (arrayBuffer, options) {
  this._soundNode.playArrayBuffer(arrayBuffer, this._pannerNode._rawNode, options);
};

PanningSound.prototype.setPosition = function (x, y) {
  this._pannerNode.setPosition(x, y);
};

PanningSound.prototype.setOrientation = function (angle) {
  this._pannerNode.setOrientation(angle);
};

PanningSound.prototype.setDirection = function (direction) {
  this._pannerNode.setDirection(direction);
};

PanningSound.prototype.setVelocity = function (x, y) {
  this._pannerNode.setVelocity(x, y);
};

module.exports = PanningSound;
