var socket = require('../socket');

function exec(method, arguments) {
  var data = { method: method, arguments: arguments };
  socket.emit('exec', data);
}

module.exports = {
  exec: exec
};
