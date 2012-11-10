var http = require('http');
var ecstatic = require('ecstatic')(__dirname+'/bookmarklet');

http.createServer(ecstatic).listen(3000);

console.log(__dirname);
console.log('Listening on: http://localhost:3000');


///setup socket io to proxy sound buffers through to all clients
