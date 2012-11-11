'use strict';

function SoundNode(context) {
  this._context = context;
  this._rawNode = null;
}

SoundNode.prototype.play = function (length, sampleRate, channel0, dest) {
  dest = dest || this._context.destination;

  var destAudioBuffer = context.createBuffer(1, length, sampleRate);
  var destFloat32Array = destAudioBuffer.getChannelData(0);
  var sourceFloat32Array = channel0;

  for (var i = 0; i < sourceFloat32Array.length; ++i) {
      destFloat32Array[i++] = sourceFloat32Array[i];
  }

  this._rawNode = this._context.createBufferSource();
  this._rawNode.buffer = destAudioBuffer;

  this._rawNode.connect(dest);
  this._rawNode.noteOn(0);
};
