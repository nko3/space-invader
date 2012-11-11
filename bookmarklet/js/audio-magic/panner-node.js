'use strict';

var mixinDirectional = require('./helpers').mixinDirectional;

function PannerNode(context) {
  this._rawNode = context.createPanner();
}

mixinDirectional(PannerNode.prototype);

module.exports = PannerNode;
