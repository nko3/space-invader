'use strict';

function SoundNode(context) {
  this._context = context;
  this._rawNode = null;
}

SoundNode.prototype.playRawData = function (length, sampleRate, channel0, dest, gain) {
  dest = dest || this._context.destination;

  var destAudioBuffer = this._context.createBuffer(1, length, sampleRate);
  var destFloat32Array = destAudioBuffer.getChannelData(0);
  var sourceFloat32Array = channel0;

  for (var i = 0; i < sourceFloat32Array.length; ++i) {
    destFloat32Array[i++] = sourceFloat32Array[i];
  }

  if (this._rawNode) {
    this._rawNode.disconnect();
  }

  this._rawNode = this._context.createBufferSource();
  this._rawNode.buffer = destAudioBuffer;

  if (gain) {
    var gainNode = this._context.createGain();
    gainNode.gain.value = gain;
    this._rawNode.connect(gainNode);
    gainNode.connect(dest);
  }
  else {
    this._rawNode.connect(dest);
  }

  this._rawNode.noteOn(0);
};

SoundNode.prototype.playAudioBuffer = function (audioBuffer, dest, options) {
  dest = dest || this._context.destination;

  if (this._rawNode) {
    this._rawNode.disconnect();
  }

  this._rawNode = this._context.createBufferSource();
  this._rawNode.buffer = audioBuffer;
  this._rawNode.loop = !!(options && options.loop);

  this._rawNode.connect(dest);
  this._rawNode.noteOn(0);
};

SoundNode.prototype.stopPlaying = function () {
  this._rawNode.noteOff(0);
};

module.exports = SoundNode;
