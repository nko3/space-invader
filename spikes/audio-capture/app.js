var http = require('http');
var ecstatic = require('ecstatic')(__dirname);

http.createServer(ecstatic).listen(3000);

console.log('Listening on: http://localhost:3000');
