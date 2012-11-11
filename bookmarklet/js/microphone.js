'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var socket = require('./socket');

function onError(err) {
  throw err;
}

// Sending data up
socket.on('welcome', function (data) {
  navigator.webkitGetUserMedia({ audio: true }, onData, onError);

  function onData(stream) {
    microphoneData(stream, processData);
  }

  function processData(audioBuffer) {
    if (ctrlKeyIsDown()) {
      var me = nko.me;
      var msg = {
        sampleRate: audioBuffer.sampleRate,
        length: audioBuffer.length,
        duration: audioBuffer.duration,
        channel0: audioBuffer.getChannelData(0),
        dude: {
          id: me.id,
          name: me.name,
          pos: me.pos,
          size: me.size
        }
      };

      socket.emit('sound', msg);
    }
  }
});

var Context = require('./audio-magic/context');

var context = new Context();

var dudePanningSounds = {};

// Receiving data
socket.on('sound', function (data) {
  ps.play(data.length, data.sampleRate, data.channel0);

  dps = dudePanningSounds[data.id];
  if (dps) {
    dps.setPosition(data.pos.x, data.pos.y);
  } else {
    dudePanningSounds[data.id] = context.createPanningSound();
  }
  //console.log(dudePanningSounds);
});

setInterval(function () {
  if (!nko.me || !nko.me.pos || !nko.me.origin) {
    // LAZY PERSON HAX
    return;
  }

  var x = nko.me.pos.x - nko.me.origin.x;

  // y is positive to the north for sound, positive to the south for nko.me.
  var y = nko.me.origin.y - nko.me.pos.y;

  // Convert to meters (very roughly).
  x /= 50;
  y /= 50;

  var direction = nko.me.state === "idle" ? "s" : nko.me.state;

  context.listener.setPosition(x, y);
  context.listener.setDirection(direction);

  // TODO velocity!
}, 100);
