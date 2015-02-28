var express = require('express');
var mongo = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var _serverPort = 8470;
var db = mongo('remmWiki',['projectDocs']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send("Hello World :) from server.js");
});

app.get('/getDocs',function (req,res) {
	console.log("I received a GET request: /getDocs");	

	db.projectDocs.find(function(err,docs){
	//	console.log(docs);
	res.json(docs);
});

});

app.post('/addDoc',function (req,res) {
	console.log("I received a POST request: /addDoc");	

	var _subject=req.body.subject;
	var _createDate=new Date();

	var result = [];
	result.push({docContent:"",parentId:null,projectId:null,subject:_subject,createDate:_createDate,createBy:null,updateDate:null,updateBy:null,docVersion:0,orderIndex:1});

	console.log(JSON.stringify(result));	
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
		projectId,
		orderIndex
		*/
	});

app.listen(_serverPort);
console.log("Server running on port: " + _serverPort);


/*

//db.projectDocs.insert({id:3,projectId:1,subject:"Sistem Gereksinimleri",docContent:"<h1>Hoş Geldiniz</h1>",parentId:1,createDate:"05.05.2014",createBy:1,updateDate:null,updateBy:null,docVersion:"1",orderIndex:1})

	{
		id:1,
		projectId:1,
		subject:"Genel",
		docContent:"<h1>Hoş Geldiniz</h1>",
		parentId:null,
		createDate:"05.05.2014",
		createBy:1,
		updateDate:null,
		updateBy:null,
		docVersion:"1",
		orderIndex:1
	}	

*/