
/*
 * GET home page.
 */

exports.index = function(req, res){
  var fs = require('fs');
  var bookmarkletify = require('bookmarkletify');
  var path = __dirname + '/../bookmarklet/js/output.js';
  fs.readFile(path, 'utf8', function(err, data){
    var bookmarkletSource = bookmarkletify(data);
    res.render('index', { bookmarkletSource: bookmarkletSource})
  });
};

exports.mp3 = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var http = require('http');
  var request = require('request');
  var url = decodeURI(req.query.url);
  http.get(url, function (res2) {
    var newURL = res2.headers.location;
    request.get(newURL).pipe(res); 
  });
};
