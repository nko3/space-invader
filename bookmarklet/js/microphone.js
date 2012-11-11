'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var updateListener = require('./update-listener');
var socket = require('./socket');

function onError(err) {
  throw err;
}

// Sending data up
socket.on('welcome', function () {
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

  updateListener(context.listener, nko.me);
}, 100);
