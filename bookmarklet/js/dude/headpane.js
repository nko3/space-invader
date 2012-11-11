'use strict';
var $pane = $('<ul>').addClass('dude-pane');

$pane
  .css({
    marginLeft :  '65px',
    background :  'antiquewhite',
    border     :  '2px solid black',
    padding    :  '2px',
    cursor     :  'pointer',
    display    :  'none',
    width      :  '150px',
    fontSize   :  '8px'
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
