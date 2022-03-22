var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

// app.use(express.static('../dist'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
}


app.use(allowCrossDomain)

app.use('/', express.static(path.join(__dirname, '../dist')))

server.listen(3000, '127.0.0.1');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
