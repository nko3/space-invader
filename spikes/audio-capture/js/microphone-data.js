var context = new window.webkitAudioContext();

module.exports = function create(stream, ondata) {

  function onaudioprocess(event) {
    var input  =  event.inputBuffer.getChannelData(0);
    ondata(input);
  }

  var microphone                 =  context.createMediaStreamSource(stream);
  var scriptProcessor            =  context.createScriptProcessor(2048);
  scriptProcessor.onaudioprocess =  onaudioprocess;
  
  microphone.connect(scriptProcessor);
  scriptProcessor.connect(context.destination);
};
