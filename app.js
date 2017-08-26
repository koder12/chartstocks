var express = require('express');
var app = express();
var http = require('http').Server(app);
var nunjucks = require('nunjucks');
var io = require('socket.io')(http);

require('./routes/index')(app, io);

app.use('/', express.static('public'));

nunjucks.configure('./views', {
  autoescape: true,
  express: app,
  async: true
});

http.listen(3000, function () {
  console.log('listening on :3000');
});