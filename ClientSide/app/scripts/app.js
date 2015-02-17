'use strict';

/**
 * @ngdoc overview
 * @name rsAppsApp
 * @description
 * # rsAppsApp
 *
 * Main module of the application.
 */
angular
  .module('rsAppsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/Rswiki',{
        templateUrl: 'views/RS-Wiki.html',
        controller:'RsWikiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
