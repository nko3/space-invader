var port = 3000;

var http     =  require('http');
var ecstatic =  require('ecstatic')(__dirname+'/bookmarklet');

var server = http.createServer(ecstatic).listen(port);
var io = require('socket.io').listen(server);
var count = 0;

console.log('Listening on: http://localhost:', port);

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { user: count++ });
  socket.on('sound', function (data) {
    console.log(data);
    socket.broadcast.emit('sound', data);
  });
});

///setup socket io to proxy sound buffers through to all clients
