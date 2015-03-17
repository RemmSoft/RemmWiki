var express = require('express');
var session = require('express-session');
var resource = require('express-resource');
//var mongoStore = require('connect-mongo')(express);
var mongo = require('mongojs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var url=require('url');

//////////////////////////////////////// MIDDLEWARE

var app = express();

var _serverPort = 8470;
var db = mongo('remmWiki',['projectDocs','projects']);
app.use(express.static(__dirname + '/public'));
app.set('views',__dirname||'/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(cookieParser('notsosecretkey'));
app.use(session({secret: 'notsosecretkey123'}));

//collectionlar yoksa create et

////////////////////////////////////////// HANDLERS

app.get('/',function (req,res){
});

app.get('/login',function (req,res){
	res.send("Login");

});

app.get('/main',function (req,res){
	res.send("Main");

});

function logout(req, res) {
  req.session = null;
  return res.json({});
}

app.get('/getProjects',function (req,res) {
	console.log("I received a GET request: /getProjects");	

	db.projects.find(function(err,docs){
		if(err!=null){			
			console.log(err);
		}else{		
			res.json(docs);
		}
	});
});

app.get('/getDocs/:projectId',function (req,res) {
	console.log("I received a GET request: /getDocs/" + req.params.projectId);	

	var projectId=req.params.projectId;

	db.projectDocs.find({projectId:mongo.ObjectId(projectId)},function(err,docs){			
		if(err!=null){			
			console.log(err);
		}else{
			res.json(docs);
		}
	});
});

app.get('/getDoc/:id',function (req,res) {
	var id= req.params.id;	
	db.projectDocs.findOne({_id:mongo.ObjectId(id)},function (err,doc) {
		if(err!=null){			
			console.log(err);
		}else{			
			res.json(doc);
		}
	});
});

app.post('/addDoc',function (req,res) {
	console.log("I received a POST request: /addDoc");	

	var _subject=req.body.subject;
	var _createDate=new Date();
	var _projectId=mongo.ObjectId(req.body.projectId);

	var result = [];
	result.push({
		docContent:"",
		parentId:null,
		projectId:_projectId,
		subject:_subject, 
		createDate:_createDate,
		createBy:null,
		updateDate:null,
		updateBy:null,
		docVersion:0,
		orderIndex:1
	});

	//console.log(JSON.stringify(result));	
	db.projectDocs.insert(result,function(err,doc){
		if(err!=null){			
			console.log(err);
		}else{
			res.json(doc);
		}
	});

	/*
		parentId
		createBy,		
		orderIndex 
		*/
	});

app.delete('/deleteDoc/:id',function (req,res) {
	var id= req.params.id;
	
	db.projectDocs.remove({_id:mongo.ObjectId(id)},function (err,doc) {
		if(err!=null){			
			console.log(err);
		}else{
			res.json(doc);
		}
	});
});

app.put('/updateDoc/:id',function (req,res) {
	console.log(req.body);	

	var id= req.params.id;

	db.projectDocs.findAndModify({query: {_id: mongo.ObjectId(id)},
		update: {$set: { docContent:req.body.docContent,
			parentId:mongo.ObjectId(req.body.parentId),
			subject:req.body.subject,
			createDate:req.body.createDate,
			createBy:req.body.createBy,
			updateDate:req.body.updateDate,
			updateBy:req.body.updateBy,
			docVersion:req.body.docVersion,
			orderIndex:req.body.orderIndex}},
			new: true}, function (err,doc) {				
				if(err!=null){			
					console.log(err);
				}else{
					res.json(doc);
				}
			});
});

////////////////////////////////////////// ROUTES

app.get('/logout', logout);

////////////////////////////////////////// SERVER LISTEN

app.listen(_serverPort);
console.log("Server running on:" + _serverPort);

