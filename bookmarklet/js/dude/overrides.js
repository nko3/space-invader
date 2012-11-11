var speed = 200;
var me;

function setGotoSpeed (speed_) {
  me.overrides.speed = speed_;
}

nko.Vector.prototype.normalize = function () {
  var length = this.length();
  return new nko.Vector(this.x / length, this.y / length);
};

function init (nko) {
  me = nko.me;
  me.overrides = { speed: 200 };

  nko.Dude.prototype.goTo = function(pos, duration, callback) {
    pos = new nko.Vector(pos).minus(this.origin);

    if (typeof(duration) === 'function')
      callback = duration;

    var self = this
      , delta = pos.minus(this.pos)
      , duration = duration !== undefined && typeof(duration) !== 'function' ? duration : delta.length() / this.overrides.speed * 1000;

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

  nko.Dude.prototype.showCar = function () {}
  nko.Dude.prototype.hideCar = function () {}
}

module.exports = {
  init: init,
  setGotoSpeed: setGotoSpeed
}
