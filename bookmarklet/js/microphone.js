'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var socket = io.connect('http://' + window.location.hostname + ':3000');

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

var Context = require('./context');

var context = new Context();
var ps = context.createPanningSound();

//context.listener.(setPosition|setOrientation);

// Receiving data
socket.on('sound', function (data) {
  ps.play(data.length, data.sampleRate, data.channel0);

//  ps.setPosition|setOrientation;
});
