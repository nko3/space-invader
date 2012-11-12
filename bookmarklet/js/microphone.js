'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var positioner = require('./update-position-and-direction');
var config = require('./config');
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

var dudeSounds = Object.create(null);

// Receiving data
socket.on('sound', function (data) {
  if (!dudeSounds[data.dude.id]) {
    dudeSounds[data.dude.id] = {};
  }

  var ds = dudeSounds[data.dude.id];
  ds.panning = context.createPanningSound();
  ds.panning.playRawData(data.length, data.sampleRate, data.channel0, 20);
});

setInterval(function () {
  if (!nko.me || !nko.me.pos || !nko.me.origin) {
    // LAZY PERSON HAX
    return;
  }

  positioner.updatePositionAndDirection(context.listener, nko.me);

  Object.keys(dudeSounds).forEach(function (id) {
    var ds = dudeSounds[id];
    var dude = nko.dudes[id];
    positioner.updatePositionAndDirections(ds, dude);
  });
}, 100);

exports.playMP3FromDude = function playMP3FromDude(url, dude) {
  context.createAudioBufferFromURL(url, function (err, buffer) {
    if (err) {
      throw err;
    }
    else {
      if (!dudeSounds[dude.id]) {
        dudeSounds[dude.id] = {};
      }

      var ds = dudeSounds[dude.id];
      ds.tts = context.createPanningSound();

      ds.tts.playAudioBuffer(buffer);
    }
  });
};

var carSoundAudioBuffer = null;
context.createAudioBufferFromURL(config.path + 'sounds/car.wav', function (err, audioBuffer_) {
  if (err) {
    throw err;
  }

  carSoundAudioBuffer = audioBuffer_;
});

exports.playCarSoundForDude = function (dude) {
  if (!carSoundAudioBuffer) {
    return;
  }

  if (!dudeSounds[dude.id]) {
    dudeSounds[dude.id] = {};
  }

  var ds = dudeSounds[dude.id];
  ds.car = context.createPanningSound();

  ds.car.playAudioBuffer(carSoundAudioBuffer, { loop: true });
};

exports.stopCarSoundForDude = function (dude) {
  var ds = dudeSounds[dude.id];
  if (ds && ds.car) {
    ds.car.stopPlaying();
  }
};
