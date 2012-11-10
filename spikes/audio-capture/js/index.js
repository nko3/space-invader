window.audioData = [];
function onError(err) {
  console.dir(err);
}

var context = new window.webkitAudioContext();

navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var scriptProcessor = context.createScriptProcessor(2048);
  scriptProcessor.onaudioprocess = onaudioprocess;

  microphone.connect(scriptProcessor);
  scriptProcessor.connect(context.destination);
  context.startRendering();
  function onaudioprocess(event){
    var data = event.outputBuffer.getChannelData(0)
    audioData.push(data);
  }
}, onError);
