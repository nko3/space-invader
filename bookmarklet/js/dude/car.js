var $car;

function init(me) {
  var $div = me.div;

  var mtop = me.size.y - 25 + 20;
  $car = $('<div>').addClass('dude-car');
  $car
    .css({ 
      backgroundImage: 'url(http://' + window.location.hostname + ':3000/img/car.png)',
      backgroundRepeat: 'none',
      width: '128px',
      height: '125px',
      marginTop: mtop + 'px',
      marginLeft: '-27px',
      display: 'none'
    });

  $car.appendTo($div);
  me.car = $car;
}

module.exports = {
  init : init
}
