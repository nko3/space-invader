var microphoneData = require('./microphone-data');
var socket = io.connect('http://' + window.location.hostname + ':3000');

var ctrlKeyIsDown = false;
$(window).on({
  'keydown': function (e) {
    ctrlKeyIsDown = e.ctrlKey;
  },
  'keyup': function (e) {
    ctrlKeyIsDown = e.ctrlKey;
  }
});

socket.on('welcome', function (data) {
  console.log('welcome', data);

  function onError(err) {
    console.dir(err);
  }

  navigator.webkitGetUserMedia(
    { audio: true },
    function(stream) { microphoneData(stream, processData); },
    onError
  );

  function processData(data) {
    if (ctrlKeyIsDown) {
      var id = nko.me.id;
      socket.emit('sound', { buffer: data, id: id });
      console.log('sending sound to the server');
    }
  }
});

socket.on('sound', function (data) {
  console.log('data', data);
});
