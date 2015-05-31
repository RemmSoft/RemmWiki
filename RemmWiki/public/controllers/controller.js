'use strict';

var rsWikiApp = angular.module('rsWikiApp', ['textAngular']);

rsWikiApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
        
        $scope.appVersion = "1";
        $scope.docList = null;
        $scope.projectList = null;
        $scope.selectedDoc = null;
        $scope.orightml = '';
        $scope.htmlcontent = $scope.orightml;
        $scope.disabled = false;
        $scope.langList = null;
        $scope.currentLang = null;
        $scope.currentProject = {
            _id : null,
            name : "RemmSoft",
            description: "",
            lang : "",
            image : ""
        };
        
        var getLangs = function () {
            $http.get('/Lang').success(function (response) {
                $scope.langList = response;
                
                $scope.currentLang = $scope.langList[0];
                getProjects();
            });
        };
        
        
        
        var getProjects = function () {
            if ($scope.currentLang == null)
                return;
            
            console.log($scope.currentLang.code);//
            
            var lang = $scope.currentLang.code;
            
            $http.get('/Project/' + lang).success(function (response) {
                $scope.projectList = response;
            });
        };
        
        var refresh = function () {
            var projectId = $scope.currentProject._id;
            
            if (projectId != null) {
                $http.get('/Docs/' + projectId).success(function (response) {
                    console.log("LOG:GET REQUEST Project Documents Success.");//
                    $scope.docList = response;
                    $scope.doc = "";
                    $scope.selectedDoc = null;
                    $scope.orightml = '';
                    $scope.htmlcontent = $scope.orightml;
                    $scope.disabled = false;
                });
            }
        };
        
        getLangs();
        
        $scope.selectLang = function (lang) {
            console.log(lang);//
            $scope.currentLang = lang;
            getProjects();
        };
        
        $scope.selectProject = function (project) {
            $scope.currentProject = project;
            refresh();
        };
        
        $scope.addDoc = function () {
            console.log($scope.doc);//
            
            $scope.doc.projectId = $scope.currentProject._id;
            
            $http.post('/Doc', $scope.doc).success(function (response) {
                console.log(response);
                refresh();
            });
        };
        
        $scope.selectDoc = function (id) {
            console.log("/Doc/" + id);//		
            
            $http.get('/Doc/' + id).success(function (response) {
                console.log(response);
                $scope.selectedDoc = response;
                $scope.orightml = response.docContent;
                $scope.htmlcontent = $scope.orightml;
            });
        };
        
        $scope.remove = function (id) {
            console.log("/Doc/" + id);//
            $http.delete('/Doc/' + id).success(function (response) {
                refresh();
            });
        };
        
        $scope.save = function (doc) {
            console.log(doc);//
            
            var id = doc._id;
            
            $http.put("/Doc/" + id, doc).success(function (response) {
                $scope.selectedDoc = response;
                refresh();
            });
        };
      
       
    }]);


//rsWikiApp.directive("rsTreeList", function () {
//    var directive = {};
//    directive.restrict = "E";//
//    directive.scope = {
//        docList : "=docList"
//    };

//    directive.templateUrl = "rsTreeListTemplate.html";     

//    return directive;
//});


rsWikiApp.directive("rsTreeList", function () {
    return {
        restrict: "E",
        scope: {
            docs : "=",
            selectDoc : "&"
        }, 
        templateUrl: "rsTreeListTemplate.html",
        link: function (scope, elm, attrs) {
            $(elm).treed();
        }
    }
    
});
