var path;

if (window.location.href.indexOf('nodeknockout') > 0){
  path = 'http://space-invader.nko3.jit.su/';
}
else{
  path = 'http://localhost:3000/';
}

module.exports = {
  path:path
};
