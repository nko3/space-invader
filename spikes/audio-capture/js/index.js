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
    for (var i = 0; i < 2; i++) {
      var data = event.outputBuffer.getChannelData(i);
      audioData.push(data);
    }
  }
}, onError);


setInterval(function () {
  var sum = 0;
    audioData.forEach(
      function (arr) {
        Array.prototype.forEach.call(arr, function (x) { sum += x; });
      });
  console.log(sum);
}, 1000);
