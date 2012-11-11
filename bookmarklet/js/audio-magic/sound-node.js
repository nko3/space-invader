'use strict';

function SoundNode(context) {
  this._context = context;
  this._rawNode = null;
}

SoundNode.prototype.playTo = function (audioData, dest) {
  var makeItMono = true;

  if (this._rawNode) {
    this._rawNode.disconnect();
  }

  this._rawNode = this._context.createBufferSource();
  this._rawNode.buffer = this._context.createBuffer(audioData, makeItMono);

  this._rawNode.connect(dest);

  this._rawNode.noteOn(0);
};
