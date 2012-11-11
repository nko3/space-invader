var port = 3000;

var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static('bookmarklet'));
});
var server = app.listen(port)

app.get('/', routes.index);


//socket io
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
