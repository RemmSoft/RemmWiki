var rsWikiApp = angular.module('rsWikiApp',['textAngular','ya.treeview', 'ya.treeview.tpls', 'ya.treeview.breadcrumbs', 'ya.treeview.breadcrumbs.tpls']);

rsWikiApp.controller('MainController',['$scope','$http',function($scope,$http){
	console.log("LOG:Angular Controller Running. (MainController)");//

	 $scope.docContext = {
 		docList:null,
      	selectedNodes: []
  	};
	$scope.projectList=null;
	$scope.langList=null;
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
	$scope.currentLang = {	
		name:"TR-tr"
	};
	$scope.treeList={
		options:null
	};

	var getProjects = function () {
		var lang=$scope.currentLang.name;

		$http.get('/getProjects/'+lang).success(function(response){
			console.log(response);
			$scope.projectList=response;
		});
	};

	var getLanguages = function () {
		$http.get('/getLanguages').success(function(response){
		$scope.langList=response;
		});
	};

	var clearScopes = function () {	
		$scope.doc="";
		$scope.selectedDoc=null;
		$scope.orightml = '';
		$scope.htmlcontent = $scope.orightml;
		$scope.disabled = false;
		$scope.docContext.docList=null;				
	};

	var clearCurrentProject = function () {	
		$scope.currentProject = {
			_id : null,
			name : "RemmSoft",
			lang : "",
			image : "",
		};			
	};

	var refresh = function () {	
		clearScopes();
		var projectId=$scope.currentProject._id;

		console.log(projectId);

		if(projectId!=null){
			$http.get('/getDocs/'+ projectId).success(function(response){
				console.log("LOG:GET REQUEST Project Documents Success.");//
				$scope.docContext.docList=response;			
			});
		}
	};

	getLanguages();
	getProjects();

	$scope.selectLang=function(lang){				
		$scope.currentLang=lang;	
		clearCurrentProject();
		getProjects();	
		refresh();
	};

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

	$scope.treeList.options = {
      onSelect: function($event, node, context) {
          if ($event.ctrlKey) {
              	var idx = context.selectedNodes.indexOf(node);
	              if (context.selectedNodes.indexOf(node) === -1) {
	                  context.selectedNodes.push(node);
	              } else {
	                  context.selectedNodes.splice(idx, 1);
	              }
	          } else {
	              context.selectedNodes = [node];
	          }
      	}
  	};	 

}]);

