'use strict';

var mixinDirectional = require('./helpers').mixinDirectional;

function Listener(audioContext) {
  this._rawNode = audioContext.listener;
}

mixinDirectional(Listener.prototype);

module.exports = Listener;
