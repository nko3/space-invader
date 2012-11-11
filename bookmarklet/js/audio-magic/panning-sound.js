'use strict';

var PannerNode = require('./panner-node');
var SoundNode = require('./sound-node');

function PanningSound(context) {
  this._context = context;
  this._pannerNode = new PannerNode(context);
  this._soundNode = new SoundNode(context);
}

PanningSound.prototype.play = function (length, sampleRate, channel0) {
  this._pannerNode._rawNode.connect(this._context.destination);
  this._soundNode.play(length, sampleRate, channel0, this._pannerNode._rawNode);
};

PanningSound.prototype.setPosition = function (x, y) {
  this._pannerNode.setPosition(x, y);
};

PanningSound.prototype.setOrientation = function (angle) {
  this._pannerNode.setOrientation(angle);
};

PanningSound.prototype.setVelocity = function (x, y) {
  this._pannerNode.setVelocity(x, y);
};

module.exports = PanningSound;

/*  // RESET panner node; this compensates for a glitch (we think)
  this._pannerNode._rawNode.disconnect();

  var options = { cone: this.cone, position: this.position };
  this._pannerNode = new PannerNode(this._context, options);

  this._pannerNode.rawNode.connect(context.destination);
};*/
