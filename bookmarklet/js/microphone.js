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

  function processData(data) {
    if (ctrlKeyIsDown()) {
      console.log('sending sound to the server');
      socket.emit('sound', { buffer: data, id: nko.me.id });
    }
  }
});

// Receiving data
socket.on('sound', function (data) {
  console.log('data', data);
});
