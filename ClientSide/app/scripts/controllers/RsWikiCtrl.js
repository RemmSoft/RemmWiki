'use strict';

/**
 * @ngdoc function
 * @name rsAppsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rsAppsApp
 */
angular.module('rsAppsApp')
  .controller('RsWikiCtrl', function ($scope) {
    $scope.Rs-Doc[{
// parametre olarak kullanılacak

      "projectId":"1",
//
      "id":"1",
      "subject":"Test1",
      "content":"<div> selam dünya 1!! </div>",
    "parentId":"",
      "createDate":"" ,
      "createBy":"0",
      "updateDate":"" ,
      "updateBy":"0",
      "docVersion":"1", // sayısal artan bir değer
      "orderIndex" : "1"
  },
  {
// parametre olarak kullanılacak

    "projectId":"2",
//
    "id":"2",
    "subject":"Test2",
    "content": "<div>selam dünya 2 !!</div>"
  ,
"parentId":"",
  "createDate":"" ,
  "createBy":"0",
  "updateDate":"" ,
  "updateBy":"0",
  "docVersion":"1", // sayısal artan bir değer
  "orderIndex" : "1"
},
    {
    "projectId":"3",
//
      "id":"1",
      "subject":"Test3",
      "content":"<div> selam dünya 3!!</div>",
      "parentId":"",
      "createDate":"" ,
      "createBy":"0",
      "updateDate":"" ,
      "updateBy":"0",
      "docVersion":"1", // sayısal artan bir değer
      "orderIndex" : "1"
  }

    ];
  });

