var express = require('express');
var mongo = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var _serverPort = 8470;
var db = mongo('remmWiki',['projectDocs','projects']);

//collectionlar yoksa create et

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

app.listen(_serverPort);
console.log("Server running on port: " + _serverPort);


/*

//db.projectDocs.insert({id:3,projectId:1,subject:"Sistem Gereksinimleri",docContent:"<h1>Hoş Geldiniz</h1>",parentId:1,createDate:"05.05.2014",createBy:1,updateDate:null,updateBy:null,docVersion:"1",orderIndex:1})

	{
		_id:xxxx,
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

	{
	 name: String,
    lang: String,
    isDeleted: Boolean,
    icon: String
	}

*/