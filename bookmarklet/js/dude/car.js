var $car;

function giveCar(dude) {
  var $div = dude.div;

  var carTop = Math.abs(128 - dude.size.y) / 2;
  var carLeft = -1 * Math.abs(128 - dude.size.x) / 2;
  $car = $('<div>').addClass('dude-car');
  $car
    .css({
      backgroundImage: 'url(http://' + window.location.hostnadude + ':3000/img/car.png)',
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
  dude.car = $car;
}

module.exports = {
  giveCar : giveCar
}
