var http=require('http');
var serverPort=8182;

http.createServer(function(req,res){
  res.writeHead(200,{'content-Type':'text/plain'});
  res.end('Hello World');
}).listen(8182,'127.0.0.1');

console.log("Server runing at http://127.0.0.1:"+8182+"/");
















































//var pm2 = require('pm2');
//var express = require('express');
//
//pm2.connect(function() {
//  pm2.start({
//    script    : 'server.js',         // Script to be run
//    exec_mode : 'cluster',        // Allow your app to be clustered
//    instances : 4,                // Optional: Scale your app by 4
//    max_memory_restart : '100M'   // Optional: Restart your app if it reaches 100Mo
//  }, function(err, apps) {
//    pm2.disconnect();
//  });
//});