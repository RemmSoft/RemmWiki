var http = require('http');
var _host = "127.0.0.1";
var _port = "2119";

http.createServer(function (request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n');
}).listen(_port, _host);

console.log('Server running at http://'+ _host + ':' + _port +'/');