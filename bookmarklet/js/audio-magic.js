"use strict";

var context,
    players,
    soundNodes,
    boardEl,
    boardWidth,
    boardHeight;

var lastPlayerId = 0;

function init() {
  boardEl = document.getElementById('board');
  boardWidth = 500;
  boardHeight = 500;

  boardEl.style.width = boardWidth + 'px';
  boardEl.style.height = boardHeight + 'px';

  players = [];
  soundNodes = [];

  setupContext();

  var friends = 'sounds/Friends.mp3';
  var hello = 'http://thelab.thingsinjars.com/web-audio-tutorial/hello.mp3';
  var beep = 'sounds/beep.mp3';
  var tweet = 'sounds/tweet.mp3';

  /*var sound = new Sound({
    position: [0,0,0],
    path: hello,
    gain: 0.1,
    loop: true
  });*/


  var sound2 = new Sound({
    position: [0,0,0],
    path: hello,
    gain: 0.5,
    loop: true
  });

  var player = new Player({
    position: [0,0,0],
    path: tweet,
    gain: 0.5
  });
}

function Player(options) {
  this.id = lastPlayerId++;
  this.position = options.position;
  this.angle = options.angle || 0;

  this.listener = new Listener({
    position: this.position,
    angle: this.angle
  });

  this.panningSound = new PanningSound({
    position: this.position,
    path: options.path,
    loop: options.loop,
    coneAngle: {
      innerAngle: 30,
      outerAngle: 40,
      outerGain: 0.5
    }
  });

  this.elPos = coordsToPixels(this.position);

  var el = document.createElement('div');
  el.id = 'player-' + this.id;
  el.className = 'node player';
  el.style.left = this.elPos[0] + 'px';
  el.style.top = this.elPos[1] + 'px';
  boardEl.appendChild(el);

  this.el = el;

  window.addEventListener("keypress", function (ev) {
    switch (ev.charCode) {
    case "w".charCodeAt(0):
      this.move(0, 1, 0);
      break;
    case "a".charCodeAt(0):
      this.move(-1, 0, 0);
      break;
    case "s".charCodeAt(0):
      this.move(0, -1, 0);
      break;
    case "d".charCodeAt(0):
      this.move(1, 0, 0);
      break;
    case "q".charCodeAt(0):
      this.rotate(-5);
      break;
    case "e".charCodeAt(0):
      this.rotate(5);
      break;
    case "x".charCodeAt(0):
      this.beep();
    }
  }.bind(this));
}

Player.prototype.move = function(dx, dy, dz) {
  var newX = this.position[0] + dx/2;
  var newY = this.position[1] + dy/2;
  var newZ = this.position[2] + dz/2;

  var newPos = [newX, newY, newZ];
  this.position = newPos;
  this.listener.setPosition(newPos);
  this.panningSound.setPosition(newPos);

  var newElX = this.elPos[0] + dx*5;
  var newElY = this.elPos[1] - dy*5;
  this.el.style.left = newElX + 'px';
  this.el.style.top = newElY + 'px';
  this.elPos = [newElX, newElY];
}

Player.prototype.rotate = function(dTheta) {
  this.angle += dTheta;
  if (this.angle < 0) {
    this.angle += 360;
  } else if (this.angle >= 360) {
    this.angle -= 360;
  }

  this.listener.setOrientation(this.angle);

  this.el.style['-webkit-transform'] = 'rotate(' + this.angle + 'deg)';
}

Player.prototype.beep = function() {
  this.panningSound.beep();
}

function Sound(options) {
  this.position = options.position;

  this.panningSound = new PanningSound({
    position: this.position,
    path: options.path,
    loop: options.loop,
    autoplay: true
  });

  this.elPos = coordsToPixels(this.position);

  var el = document.createElement('div');
  el.className = 'node sound';
  el.style.left = this.elPos[0] + 'px';
  el.style.top = this.elPos[1] + 'px';
  boardEl.appendChild(el);

  this.el = el;
}

//////////

// HELPERS

window.onload = init;
