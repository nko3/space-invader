'use strict';

module.exports = function VolumeNode(context, gain) {
  this.context = context;
  this.rawNode = context.createGainNode();

  this.rawNode.gain.value = gain;
};

