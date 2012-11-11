'use strict';

function PannerNode(context, options) {
  this.rawNode = context.createPanner();
  this.setPosition(options.position);
  if (options.coneAngle) {
    this.setSoundCone(options.coneAngle);
  }
}

PannerNode.prototype.setPosition = function (pos) {
  this.rawNode.setPosition(pos[0], pos[1], pos[2]);
};

PannerNode.prototype.setSoundCone = function (options) {
  this.rawNode.coneInnerAngle = options.innerAngle;
  this.rawNode.coneOuterAngle = options.outerAngle;
  this.rawNode.coneOuterGain = options.outerGain;
};

module.exports = PannerNode;
