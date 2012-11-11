var DEFAULT_SPEED = 200;
var car = require('./car');
var broadcast = require('./broadcast');

nko.Vector.prototype.normalize = function () {
  var length = this.length();
  return new nko.Vector(this.x / length, this.y / length);
};

function init (nko) {
  nko.me.div.css('cursor', 'pointer');

  var OldDude = nko.Dude;
  nko.Dude = function (options) {
    console.log('constructing', options);
    OldDude.apply(this, arguments);
    this.speed = options.speed;
    this.updateCar(options);
  };
  nko.Dude.prototype = Object.create(OldDude.prototype);
  nko.Dude.prototype.constructor = nko.Dude;

  nko.Dude.prototype.toJSON = function () {
    var json = OldDude.prototype.toJSON.call(this);
    json.speed = this.speed;
    json.hasCar = this.hasCar;

    return json;
  };

  // Use `OldDude` so that it works on `nko.me` as well (which is already created).
  OldDude.prototype.goTo = function (pos, duration, callback) {
    var speed = this.speed || DEFAULT_SPEED;

    pos = new nko.Vector(pos).minus(this.origin);

    if (typeof(duration) === 'function')
      callback = duration;

    var self = this
      , delta = pos.minus(this.pos)
      , duration = duration !== undefined && typeof(duration) !== 'function' ? duration : delta.length() / speed * 1000;

    this.vel = delta.normalize().times(speed);

    this.animate(delta.cardinalDirection());
    if (duration && duration > 0)
      this.div.stop();
    this.div
      .animate({
        left: pos.x,
        top: pos.y
      }, {
        duration: duration,
        easing: 'linear',
        step: function(now, fx) {
          switch (fx.prop) {
            case 'left':
              self.pos.x = now;
              break;
            case 'top':
              self.pos.y = now;
              self.div.css('z-index', Math.floor(now));
              break;
          }
        },
        complete: function() {
          self.pos = pos;
          self.vel = new nko.Vector(0, 0);
          if (callback) callback();
        }
      });
  };

  OldDude.prototype.updateCar = function (opts) {
    this.hasCar = opts.hasCar;
    if (!this.car) car.giveCar(this);

    if (this.hasCar) {
      this.speed = 1500;
      if(!this.car.is(':visible')) this.car.fadeIn(200);

    } else {
      this.speed = 200;
      if(this.car.is(':visible')) this.car.fadeOut(200);
    }
  };
}

exports.init = init;
