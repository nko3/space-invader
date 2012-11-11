'use strict';

var PannerNode = require('./panner-node');
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
  this.audioContext = createAudioContext();

  var listenerOptions = { position: [0, 0, 0], angle: 0 };
  this.listener = new Listener(this.audioContext, listenerOptions);
}

Context.prototype.createPannerNode = function (options) {
  return new PannerNode(this.audioContext, options);
};

module.exports = Context;
