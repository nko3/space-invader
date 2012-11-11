'use strict';

var microphoneData = require('./microphone-data');
var ctrlKeyIsDown = require('./ctrl-key-is-down');
var socket = io.connect('http://' + window.location.hostname + ':3000');

function onError(err) {
  throw err;
}

// Sending data up
socket.on('welcome', function (data) {
  console.log('welcome', data);

  navigator.webkitGetUserMedia({ audio: true }, onData, onError);

  function onData(stream) {
    microphoneData(stream, processData);
  }

  function processData(audioBuffer) {
    if (ctrlKeyIsDown()) {
      var me = nko.me;
      console.log(data);
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

      console.log('sending msg to the server', msg);
      socket.emit('sound', msg);
    }
  }
});

// Receiving data
socket.on('sound', function (data) {
  console.log('data', data);
});
