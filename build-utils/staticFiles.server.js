// var express = require('express');
// var app = express();

// app.use(express.static('../dist'));

// app.listen(3000, () => console.log("Server started"));

// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const config = require('./webpack.config.dev.js');
// const compiler = webpack(config);

// const server = new WebpackDevServer(compiler, config.devServer);

// server.start(3000, () => {
//     console.log('Starting server');
// });


// var express = require('express');
// var http = require('http');

// var app = express();
// var server = http.createServer(app);

// app.use(express.static('../dist/bundle-stats.html'));

// server.listen(3000, '127.0.0.1');
// server.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });



// var http = require("http");  
// var server = http.createServer(function(request, response) {  
//     response.writeHead(200, {  
//         'Content-Type': 'text/plain'  
//     });  
//     response.write("This is Test Message.");  
//     response.end();  
// });  
// server.listen(3000);  

// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile(__dirname + '/../dist/bundle-stats.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             response.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// };

// http.createServer(handleRequest).listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`)
// }); 








const express = require('express');
const app = express();
const PORT = 3000;
var http = require('http');


app.use(express.static('dist'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = http.createServer(app);
server.listen(PORT, '127.0.0.1');
server.on('listening', function () {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

// app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));