window.audioData = [];
function onError(err) {
  console.dir(err);
}

var context = new window.webkitAudioContext();

navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var scriptProcessor = context.createScriptProcessor(2048);
  scriptProcessor.onaudioprocess = onaudioprocess;
  console.log(scriptProcessor);

  var hello = 'http://thelab.thingsinjars.com/web-audio-tutorial/hello.mp3';
  var request = new XMLHttpRequest();
  request.open("GET", hello, true);
  request.responseType = "arraybuffer";

  request.onload = function() {
    var audio = request.response;
    var sound = context.createBufferSource();
    sound.buffer = context.createBuffer(audio, true);
    sound.loop = true;
    
    sound.connect(scriptProcessor);
    sound.connect(context.destination);
    sound.start(0);
  };

  request.send();

  // microphone.connect(scriptProcessor);
  // scriptProcessor.connect(context.destination);
  // context.startRendering();
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
