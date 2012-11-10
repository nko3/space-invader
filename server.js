var port = 3000;

var http     =  require('http');
var ecstatic =  require('ecstatic')(__dirname+'/bookmarklet');

var server = http.createServer(ecstatic).listen(port);
var io = require('socket.io').listen(server);

console.log('Listening on: http://localhost:', port);

io.sockets.on('connection', function (socket) {
  socket.on('sound', function (data) {
    console.log(data);
  });
});

///setup socket io to proxy sound buffers through to all clients
