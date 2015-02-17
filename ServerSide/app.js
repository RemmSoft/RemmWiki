//Modullerin Eklenmesi
var express= require('express')
    ,app = express()
 	,http = require('http')
 	,path = require('path')    
 	,mongoose = require('mongoose')
 	,mongoStore = require('connect-mongo')(express)
    ,redis = require('redis')
 	,ENV = process.env.NODE_ENV || 'development';

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var index = app.require('/routes/index');
var user = app.require('/routes/user');
var project = app.require('/routes/project');

app.use('/user',user);
app.use('/project',project);

app.use('/index',index)
    .get(function(request,response){
        response.sendFile(__dirname + '/views/index.html');
    //projeleri bas
    //seçileni paremetre olarak al dökümanları döndür
    });

app.use('/index/:id',index)
    .get(function(request,response){
    //ıd ye göre dokumanları çek
    //geri döndür  
    });

//../

//Hata Yakalama İşlemleri
//----------------------------------------------------------
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Serverın oluşturup Başlatılamsı
//----------------------------------------------------------
var server = http.createServer(app,function() {
    console.log("Server Created.");
});

server.listen(4000 , function () {
    console.log("RemmWiki server listening on port " + 4000);
});

