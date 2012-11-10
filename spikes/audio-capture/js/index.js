function onError(err) {
  console.dir(err);
}

var context = new window.webkitAudioContext();

navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var filter = context.createBiquadFilter();

  // microphone -> filter -> destination.
  microphone.connect(filter);
  filter.connect(context.destination);
  console.log('context:');
  console.dir(context);
}, onError);
