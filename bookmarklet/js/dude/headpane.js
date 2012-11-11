'use strict';
var $pane = $('<ul>').addClass('dude-pane');

$pane
  .css({
    position   :  'absolute',
    top        :  '-10px',
    left       :  '65px',
    background :  '#DDD',
    border     :  '2px solid gray',
    padding    :  '3px 10px',
    cursor     :  'pointer',
    display    :  'none',
    minWidth   :  '100px',
    fontSize   :  '12px',
    borderRadius : '5px',
    boxShadow : '2px 2px 2px gray'
  });

function init(me) {
  me.div.on('click', function (event) {
    $pane.toggle();
    return false;
  });

  $pane.appendTo(me.div);
}

function register(item, onselected) {
  var $li = $('<li>' + item + '</li>');
  $li.on('click', function (event) { 
    onselected(); 
    $pane.hide(); 
    return false; 
  });

  $li.hover(function() {
    $(this).css('color', 'blue');
  }, function() {
    $(this).css('color', 'black');
  });

  $li.appendTo($pane);
}

function unregister(item) {
  $pane
    .find('li')
    .filter(function (x) { return this.textContent === item; })
    .remove();
}

module.exports = {
  init       :  init,
  register   :  register,
  unregister :  unregister
}
