var port = 3000;

var http     =  require('http');
var ecstatic =  require('ecstatic')(__dirname+'/bookmarklet');

var server = http.createServer(ecstatic).listen(port);
var io = require('socket.io').listen(server);
io.set('log level', 1);

var count = 0;


console.log('Listening on: http://localhost:', port);

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { user: count++ });
  socket.on('sound', function (data) {
    socket.broadcast.emit('sound', data);
    console.log('data from: %s, length: %s', data.dude.id, data.channel0.length);
  });
});
