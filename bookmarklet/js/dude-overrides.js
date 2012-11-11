var speed = 200;

function setGotoSpeed (speed_) {
  speed = speed_;
}

function customizeGoto (nko) {
  nko.Dude.prototype.goTo = function(pos, duration, callback) {
    pos = new nko.Vector(pos).minus(this.origin);

    if (typeof(duration) === 'function')
      callback = duration;

    var self = this
      , delta = pos.minus(this.pos)
      , duration = duration !== undefined && typeof(duration) !== 'function' ? duration : delta.length() / speed * 1000;

    console.log('speed', speed);
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
          // z-index?

// don't face back south
//          self.animate('idle');

          if (callback) callback();
        }
      });
  };
}

module.exports = {
  customizeGoto: customizeGoto,
  setGotoSpeed: setGotoSpeed
}
