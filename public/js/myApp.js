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
        controller: 'UserController'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'UserController'
      })
      // .when('/projects/:id', {
      //   templateUrl: 'schematic.html',
      //   controller: 'HomeController'
      // })
      .when('/projects/:id/schematics', {
        templateUrl: 'upload.html',
        controller: 'UserController'
      })
      .when('/create-project', {
        templateUrl: 'CreateProject.html',
        controller: 'CreateProjectController'
      })
      .otherwise({ redirectTo: '/login' });
      $locationProvider.html5Mode(true);
  }])
  .run();



