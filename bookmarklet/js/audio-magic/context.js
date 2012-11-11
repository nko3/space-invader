'use strict';

var PanningSound = require('./panning-sound');
var Listener = require('./listener');

function createAudioContext() {
  if ('AudioContext' in window) {
    return new window.AudioContext();
  } else if ('webkitAudioContext' in window) {
    return new window.webkitAudioContext();
  } else {
    throw new Error('AudioContext not supported!');
  }
}

function Context() {
  this._audioContext = createAudioContext();

  this.listener = new Listener(this._audioContext);
}

Context.prototype.createPanningSound = function () {
  return new PanningSound(this._audioContext);
};

Context.prototype.createArrayBufferFromURL = function (url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function () {
    this._audioContext.decodeAudioData(
      request.response,
      function (arrayBuffer) {
        cb(null, arrayBuffer);
      },
      function (err) {
        cb(err, null);
      }
    );
  }.bind(this);

  request.send();
};

module.exports = Context;
