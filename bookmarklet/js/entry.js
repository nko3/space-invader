require('./microphone');
require('./dude');

// hide text on nodeko homepage
$('#inner').fadeToggle();

// Insert instruction bubble
$instr = $('<div/>');
$instr.css({
  position: 'absolute',
  left: '-290px',
  top: '10px',
  background: 'url(http://' + window.location.hostname + ':3000/img/bubble.png)',
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
  '</ol>'
];
$instr.html(instrText.join(''));

$invader = $('<div/>');
$invader.css({
  position: 'absolute',
  bottom: '-70px',
  left: '-10px',
  width: '100px',
  height: '100px',
  background: 'url(http://' + window.location.hostname + ':3000/img/space-invader.png)'
});
$invader.appendTo($instr);

$instr.prependTo($('#page'));
