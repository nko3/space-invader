var $car;

function initCar(me) {
  var $div = me.div;

  var mtop = me.size.y - 25 + 40;
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
  console.log($div[0]);
  console.log('inited car');
}

function toggleCar() {
  console.log('toggling car');
  $car.toggle();
}

module.exports = {
  initCar : initCar,
  toggleCar: toggleCar
}
