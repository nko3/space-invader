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

//      console.log('sending msg to the server', msg);
      socket.emit('sound', msg);
    }
  }
});

var context = new window.webkitAudioContext();
var destAudioBuffer = context.createBuffer(1, 2048 * 16, 44100);
var destFloat32Array = destAudioBuffer.getChannelData(0);
var currentPos = 0;

// Receiving data
socket.on('sound', function (data) {
//  var destAudioBuffer = context.createBuffer(1, data.length, data.sampleRate);
//  var destFloat32Array = destAudioBuffer.getChannelData(0);
  var sourceFloat32Array = data.channel0;

  for (var i = 0; i < sourceFloat32Array.length; ++i) {
      destFloat32Array[currentPos++] = sourceFloat32Array[i];
  }

  console.log("up to ", currentPos);
  if (currentPos === destFloat32Array.length) {
//    console.log("playing", destAudioBuffer, destFloat32Array);

    var sourceNode = context.createBufferSource();
    sourceNode.buffer = destAudioBuffer;
    sourceNode.connect(context.destination);
    sourceNode.noteOn(0);

    destAudioBuffer = context.createBuffer(1, 2048 * 16, 44100);
    destFloat32Array = destAudioBuffer.getChannelData(0);
    currentPos = 0;
  }
});
