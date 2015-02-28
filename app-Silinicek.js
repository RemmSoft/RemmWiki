//Modullerin Eklenmesi
var express = require('express')
    , app = express()
 	  , http = require('http')
 	  , path = require('path')
    , fs = require('fs')
 	  , mongoose = require('mongoose')
 	//  , mongoStore = require('connect-mongo')(express)
    , redis = require('redis')
 	  , ENV = process.env.NODE_ENV || 'development';

//models klasorü altındaki js dosyaları (Modeller) yükleniyor
/*
fs.readdirSync(__dirname + '/models/').forEach(function(fileName){
  if(~fileName.indexOf('.js')) require(__dirname + '/models/' + fileName);
});
*/

app.configure(function () {
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

fs.readdirSync(__dirname + '/models/').forEach(function(fileName){
  if(~fileName.indexOf('.js')) require(__dirname + '/models/' + fileName);
});

//------------------------------------------------------

//connect to local mongodb database
mongoose.connect('mongodb://localhost/remmWiki');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//attach lister to connected event
mongoose.connection.once('connected', function () {
    console.log("Connected to database");
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var documentSchema = new Schema({
    projectId: int,
    subject: String,
    docContent: String,
    parentId: int,
    createDate: Date,
    createBy: int,
    updateDate: Date,
    updateBy: int,
    docVersion: String,
    orderIndex: int
});

var projectShecma = new Schema({
    name: String,
    lang: String,
    isDeleted: Boolean,
    icon: String
});

// Mongoose Model definition
var Project = mongoose.model('projects',projectShecma);
var Document = mongoose.model('documents',documentSchema);

//------------------------------------------------------

app.use('/GetProjects/:lang', index)
    .get(function (request, response) {
         Project.find({ lang : request.params.lang },function(err,projects){
            response.json(projects);
         });                
    });

app.use('/GetDocs/:projectId', index)
    .get(function (request, response) {
       Document.find({ projectId : request.params.projectId },function(err,docs){
            docs.forEach(function(doc){
                doc.docContent="";
            });

            response.json(docs);
         });  
    });

 app.use('/GetDocContent/:docId', index)
    .get(function (request, response) {
         Document.findOne({ _id : request.params.docId },function(err,doc){           
            response.json(doc.docContent);
    });
});

//../

//Hata Yakalama İşlemleri
//----------------------------------------------------------
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    express.app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Serverın oluşturup Başlatılamsı
//----------------------------------------------------------
var server = http.createServer(app, function () {
    console.log("Server Created.");
});

server.listen(4000, function () {
    console.log("RemmWiki server listening on port " + 4000);
});

