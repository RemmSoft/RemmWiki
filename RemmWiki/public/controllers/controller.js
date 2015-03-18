var rsWikiApp = angular.module('rsWikiApp',['textAngular']);

rsWikiApp.controller('MainController',['$scope','$http',function($scope,$http){
	console.log("LOG:Angular Controller Running. (MainController)");//

	$scope.docList=null;
	$scope.projectList=null;
	$scope.selectedDoc=null;
	$scope.orightml = '';
	$scope.htmlcontent = $scope.orightml;
	$scope.disabled = false;
	$scope.currentProject = {
		_id : null,
		name : "RemmSoft",
		lang : "",
		image : "",
	};

	var getProjects = function () {
		$http.get('/getProjects').success(function(response){
			console.log(response);
			$scope.projectList=response;
		});
	};

	var refresh = function () {	
		var projectId=$scope.currentProject._id;

		if(projectId!=null){
			$http.get('/getDocs/'+ projectId).success(function(response){
				console.log("LOG:GET REQUEST Project Documents Success.");//
				$scope.docList=response;
				$scope.doc="";
				$scope.selectedDoc=null;
				$scope.orightml = '';
				$scope.htmlcontent = $scope.orightml;
				$scope.disabled = false;				
			});
		}
	};

	getProjects();

	$scope.selectProject=function(project){				
		$scope.currentProject=project;		
		refresh();		
	};
	
	$scope.addDoc = function(){
		console.log($scope.doc);//

		$scope.doc.projectId=$scope.currentProject._id;

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
			$scope.orightml = response.docContent;
			$scope.htmlcontent = $scope.orightml;			
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

