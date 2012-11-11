var $car;

function init(me) {
  var $div = me.div;

  var carTop = Math.abs(128 - me.size.y) / 2;
  var carLeft = -1 * Math.abs(128 - me.size.x) / 2;
  $car = $('<div>').addClass('dude-car');
  $car
    .css({
      backgroundImage: 'url(http://' + window.location.hostname + ':3000/img/car.png)',
      backgroundRepeat: 'none',
      backgroundPosition: 'top',
      width: '128px',
      height: '128px',
      position: 'absolute',
      top: carTop + 'px',
      left: carLeft + 'px',
      display: 'none'
    });

  $car.appendTo($div);
  me.car = $car;
}

module.exports = {
  init : init
}
