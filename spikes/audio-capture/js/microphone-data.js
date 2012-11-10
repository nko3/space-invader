function onError(err) {
  console.dir(err);
}

var context = new window.webkitAudioContext();

module.exports = function create(microphone, ondata) {

  function onaudioprocess(event) {
    var input  =  event.inputBuffer.getChannelData(0);
    // var output =  event.outputBuffer.getChannelData(0);

    for (var i = 0; i < output.length; i++) {
      output[i] = input[i];
    }
    ondata(input);
  }

  var scriptProcessor            =  context.createScriptProcessor(2048);
  scriptProcessor.onaudioprocess =  onaudioprocess;
  
  microphone.connect(scriptProcessor);
  scriptProcessor.connect(context.destination);
};
