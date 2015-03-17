var myApp = angular.module('myApp',[]);

myApp.controller('AppController',['$scope','$http',function($scope,$http){
	console.log("LOG:Angular Controller Running. (AppController)");//

	$scope.docList=null;
	$scope.selectedDoc=null;
	$scope.currentProject = {
	id : "54f3c008004a3e56ca765375",//
	name : "LEAN",//
	lang : "TR-tr",//
	image : "...",//
};

var refresh = function () {
	var projectId=$scope.currentProject.id;

	$http.get('/getDocs/'+ projectId).success(function(response){
		console.log("LOG:GET REQUEST Project Documents Success.");//
		$scope.docList=response;
		$scope.doc="";
		$scope.selectedDoc=null;
	});
};

refresh();

$scope.addDoc = function(){
		console.log($scope.doc);//

		$scope.doc.projectId=$scope.currentProject.id;

		$http.post('/addDoc',$scope.doc).success(function (response) {
			console.log(response);
			refresh();
		});
	};

	$scope.selectDoc = function(id){
		console.log("/getDoc/"+id);//		

		$http.get('/getDoc/'+ id).success(function(response){	
			console.log(response);
			$scope.selectedDoc=response;		
		});		
	};

	$scope.remove = function(id){
		console.log("/deleteDoc/"+id);//
		$http.delete('/deleteDoc/'+id).success(function (response) {
			refresh();
		});
	};

	$scope.save = function(doc){
		console.log(doc);//

		var id=doc._id;

		$http.put("/updateDoc/"+id,doc).success(function (response){			
			$scope.selectedDoc=response;
			refresh();
		});
	};

}]);

