var rsWikiApp = angular.module('rsWikiApp',['textAngular']);

rsWikiApp.controller('MainController',['$scope','$http',function($scope,$http){
	console.log("LOG:Angular Controller Running. (MainController)");//

	$scope.docList=null;
	$scope.selectedDoc=null;
	$scope.orightml = '';
	$scope.htmlcontent = $scope.orightml;
	$scope.disabled = false;
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
				$scope.orightml = '';
				$scope.htmlcontent = $scope.orightml;
				$scope.disabled = false;
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
/*
	var wysiwygeditor = function () {
		$scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
		$scope.htmlcontent = $scope.orightml;
		$scope.disabled = false;
	};*/

}]);

