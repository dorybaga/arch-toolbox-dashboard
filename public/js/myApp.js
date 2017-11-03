angular.module('myApp', ['ngRoute']);

angular.module('myApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
      .when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/create-user', {
        templateUrl: 'createUser.html',
        controller: 'userController'
      })
      .when('/upload', {
        templateUrl: 'upload.html',
        controller: 'userController'
      })
      .when('/create-project', {
        templateUrl: 'CreateProject.html',
        controller: 'CreateProjectController'
      })
      .when('/dashboard', {
        templateUrl: 'dashboard.html',
        controller: 'CreateProjectController'
      })
      .otherwise({ redirectTo: '/home' });

      $locationProvider.html5Mode(true);
  }])
  .run();



