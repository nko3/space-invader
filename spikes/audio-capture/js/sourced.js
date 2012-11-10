function onFailSoHard(e) {
  if (e.code == 1) {
    console.log('User denied access to their camera');
    console.dir(e);
  } else {
    console.log('getUserMedia() not supported in your browser.');
  }
}

function videoCapture() {
  var video = document.querySelector('#basic-stream');
  var button = document.querySelector('#capture-button');
  var localMediaStream = null;
  button.addEventListener('click', function (e) {
    if (navigator.getUserMedia) {
      navigator.getUserMedia('video', function (stream) {
        video.src = stream;
        video.controls = true;
        localMediaStream = stream;
      }, onFailSoHard);
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({
        video: true
      }, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        video.controls = true;
        localMediaStream = stream;
      }, onFailSoHard);
    } else {
      onFailSoHard({
        target: video
      });
    }
  }, false);
  document.querySelector('#stop-button').addEventListener('click', function (e) {
    video.pause();
    localMediaStream.stop();
  }, false);
}
videoCapture();

function screenShot() {
  var video = document.querySelector('#screenshot-stream');
  var button = document.querySelector('#screenshot-button');
  var canvas = document.querySelector('#screenshot-canvas');
  var img = document.querySelector('#screenshot');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;

  function sizeCanvas() {
    setTimeout(function () {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      img.height = video.videoHeight;
      img.width = video.videoWidth;
    }, 50);
  }

  function snapshot() {
    ctx.drawImage(video, 0, 0);
    img.src = canvas.toDataURL('image/webp');
  }
  button.addEventListener('click', function (e) {
    if (localMediaStream) {
      snapshot();
      return;
    }
    if (navigator.getUserMedia) {
      navigator.getUserMedia('video', function (stream) {
        video.src = stream;
        localMediaStream = stream;
        sizeCanvas();
        button.textContent = 'Take Shot';
      }, onFailSoHard);
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({
        video: true
      }, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        localMediaStream = stream;
        sizeCanvas();
        button.textContent = 'Take Shot';
      }, onFailSoHard);
    } else {
      onFailSoHard({
        target: video
      });
    }
  }, false);
  video.addEventListener('click', snapshot, false);
  document.querySelector('#screenshot-stop-button').addEventListener('click', function (e) {
    video.pause();
    localMediaStream.stop();
  }, false);
}

function cssFilter() {
  var video = document.querySelector('#cssfilters-stream');
  var button = document.querySelector('#capture-button2');
  var localMediaStream = null;
  var idx = 0;
  var filters = ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'hue-rotate2', 'hue-rotate3', 'saturate', 'invert', ''];

  function changeFilter(e) {
    var el = e.target;
    el.className = '';
    var effect = filters[idx++ % filters.length];
    if (effect) {
      el.classList.add(effect);
    }
  }
  button.addEventListener('click', function (e) {
    if (navigator.getUserMedia) {
      navigator.getUserMedia('video, audio', function (stream) {
        video.src = stream;
        localMediaStream = stream;
      }, onFailSoHard);
    } else if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({
        video: true
      }, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        localMediaStream = stream;
      }, onFailSoHard);
    } else {
      onFailSoHard({
        target: video
      });
    }
  }, false);
  document.querySelector('#stop-button2').addEventListener('click', function (e) {
    video.pause();
    localMediaStream.stop();
  }, false);
  video.addEventListener('click', changeFilter, false);
}
