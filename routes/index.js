
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
