'use strict';

module.exports = function playMP3FromDude(context, url, dude) {
  context.createArrayBufferFromURL(url, function(err, buffer) {
    if (err) {
      throw err;
    }
    else {
      //TODO don't overwrite the existing sound, but create array of sounds
      var dps = dudePanningSounds[data.id] = context.createPanningSound();
      dps.playArrayBuffer(buffer);
    }
  });
};
