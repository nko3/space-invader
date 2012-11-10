var microphoneData = require('./microphone-data');

function onError(err) {
  console.dir(err);
}

navigator.webkitGetUserMedia(
  { audio: true }, 
  function(stream) { microphoneData(stream, processData); }, 
  onError
);

function processData(data) {
  console.dir(data);
}
