'use strict';
var dudeOverrides = require('./dude-overrides');
var car = require('./car');

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

function initPane() {
  var me = nko.me;
  console.log('me', me);
  me.div.on('click', function (event) {
    console.log('this', this);
    console.log('event', event);
    $pane.toggle();
    return false;
  });

  $pane.appendTo(me.div);
}

setTimeout(function () {
  initPane();
  dudeOverrides.customizeGoto(nko);
  car.initCar(nko.div);
}, 200);

function register(item, onselected) {
  var $li = $('<li>' + item + '</li>');
  $li.on('click', function (event) { onselected(); return false; });
  $li.appendTo($pane);
  console.log('registering', item);
  console.log($pane);
}

module.exports = {
  register: register
}
