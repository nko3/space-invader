'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var positioner = require('./update-position-and-direction');
var socket = require('./socket');
var context = require('./context');

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

var dudePanningSounds = {};

// Receiving data
socket.on('sound', function (data) {
  if (!dudePanningSounds[data.id]) {
    dudePanningSounds[data.id] = context.createPanningSound();
  }

  var dps = dudePanningSounds[data.id];
  dps.playRawData(data.length, data.sampleRate, data.channel0);
  //console.log(dudePanningSounds);

  var dude = nko.dudes[data.id];
  if (!dude || !dps || dude === nko.me) {
    return;
  }

  positioner.updatePositionAndDirection(dps, dude);
});


// TODO disconnect dps if dude is dead

setInterval(function () {
  if (!nko.me || !nko.me.pos || !nko.me.origin) {
    // LAZY PERSON HAX
    return;
  }

  positioner.updatePositionAndDirections([context.listener], nko.me);

  Object.keys(nko.dudes).forEach(function (id) {
    var dude = nko.dudes[id];
    var soundsForDude = dudePanningSounds[id];

    positioner.updatePositionAndDirections(soundsForDude, dude);
  });
}, 100);
