window.audioData = [];

navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone =  context.createMediaStreamSource(stream);
}, onError);


setInterval(function () {
  var sum = 0;
    audioData.forEach(
      function (arr) {
        Array.prototype.forEach.call(arr, function (x) { sum += x; });
      });
  console.log(sum);
}, 1000);
