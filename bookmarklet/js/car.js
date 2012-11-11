var $car;

function initCar($div) {

  $car = $('<div>').addClass('dude-car');
  $car
    .css({ 
      backgroundImage: 'url(http://' + window.location.hostname + ':3000/img/car.png',
      display: 'none'
    });

  $car.appendTo($div);
}

function toggleCar() {
  $car.toggle();
}

module.exports = {
  initCar : initCar,
  toggleCar: toggleCar
}
