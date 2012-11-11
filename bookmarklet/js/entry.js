require('./microphone');
require('./dude');

var config = require('../config');

// hide text on nodeko homepage
$('#inner').fadeToggle();

// Insert instruction bubble
$instr = $('<div/>');
$instr.css({
  position: 'absolute',
  left: '-290px',
  top: '10px',
  background: 'url(' + config.path + '/img/bubble.png)',
  backgroundSize: '100% 100%',
  width: '270px',
  minHeight: '220px',
  zIndex: '1000',
  padding: '35px 30px',
  fontFamily: '\"04b_03\"',
  fontSize: '16px'
});

instrText = [
  'INSTRUCTIONS:',
  '<ol>',
  '<li>Press [CTRL] to talk into your microphone</li>',
  '<li>Walk around to hear everyone moving around you</li>',
  '<li>Click on yourself to get a car</li>',
  '<li>Click on me to hide these instructions</li>',
  '</ol>'
];
$instr.html(instrText.join(''));
$instr.prependTo($('#page'));

$invader = $('<div/>');
$invader.css({
  position: 'absolute',
  bottom: '-70px',
  left: '-10px',
  width: '100px',
  height: '100px',
  cursor: 'pointer',
  background: 'url(' + config.path + '/img/space-invader.png)',
});

$invader.appendTo($instr);
$invader.on('click', function () { $instr.fadeOut(200); return false; })
