var socket = io.connect('http://' + window.location.hostname + ':3000');

module.exports = socket;
