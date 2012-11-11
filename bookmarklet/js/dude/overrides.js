var DEFAULT_SPEED = 200;

nko.Vector.prototype.normalize = function () {
  var length = this.length();
  return new nko.Vector(this.x / length, this.y / length);
};

function init (nko) {
  nko.Dude.prototype.goTo = function (pos, duration, callback) {
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

  nko.Dude.prototype.showCar = function () {
    if (this.car) this.car.fadeIn(200);
  };
  nko.Dude.prototype.hideCar = function () {
    if (this.car) this.car.fadeOut(200);
  };
}

exports.init = init;
