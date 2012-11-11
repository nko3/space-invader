var socket = require('../socket');

function exec(method, opts) {
  var data = { method: method, opts: opts };
  socket.emit('exec', data);
}

module.exports = {
  exec: exec
};
