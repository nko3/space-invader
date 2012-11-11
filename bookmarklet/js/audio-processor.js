var context = new window.webkitAudioContext();

module.exports = function decode(audioData) {

  console.log('buffer', audioData.buffer);
  var buffer = context.createBuffer(audioData.buffer, true);
  var source = context.createBufferSourceNode();
  source.buffer = buffer;

  source.connect(context.destination);
};