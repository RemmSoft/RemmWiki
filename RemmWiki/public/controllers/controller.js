var myApp = angular.module('myApp',[]);

myApp.controller('AppController',['$scope','$http',function($scope,$http){
	console.log("LOG:Angular Controller Running. (AppController)");//

	$scope.docList=null;
	$scope.selectedDoc=null;
	$scope.currentProjectId =null;//

var refresh = function () {
	$http.get('/getDocs').success(function(response){
		console.log("LOG:GET REQUEST Project Documents Success.");//
		$scope.docList=response;
		$scope.doc="";
	});
};

refresh();

	$scope.addDoc = function(){
		console.log($scope.doc);//
		$http.post('/addDoc',$scope.doc).success(function (response) {
			console.log(response);
			refresh();
		});
	};

}]);

