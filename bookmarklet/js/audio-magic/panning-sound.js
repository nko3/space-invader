'use strict';

var PannerNode = require('./panner-node');
var SoundNode = require('./sound-node');

function PanningSound(context) {
  this.position = null;
  this.orientation = null;

  this._context = context;
  this._pannerNode = new PannerNode(context);
  this._soundNode = new SoundNode(context);
}

PanningSound.prototype.play = function (audioData) {
  this._pannerNode._rawNode.connect(this._context.destination);
  this._soundNode.playTo(audioData, this._pannerNode._rawNode);
};

PanningSound.prototype.setPosition = function (pos) {
  this.position = pos;
  this._pannerNode.setPosition(pos);
};

PanningSound.prototype.setOrientation = function (angle) {
  this.angle = angle;
  this._pannerNode.setOrientation(angle);
};

/*  // RESET panner node; this compensates for a glitch (we think)
  this._pannerNode._rawNode.disconnect();

  var options = { cone: this.cone, position: this.position };
  this._pannerNode = new PannerNode(this._context, options);

  this._pannerNode.rawNode.connect(context.destination);
};*/
